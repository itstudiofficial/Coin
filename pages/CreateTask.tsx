
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { PlusCircle, Globe, Wallet, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CreateTaskProps {
    type: 'task' | 'website';
}

const CreateTask: React.FC<CreateTaskProps> = ({ type }) => {
  const { state, createTask } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reward: 0,
    link: '',
    category: 'General',
    duration: 15
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!state.user) return <Navigate to="/login" />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.link || formData.reward <= 0) {
      setError('Please fill all required fields and set a valid reward.');
      return;
    }

    if (state.user!.balance < formData.reward) {
      setError('Insufficient balance to create this task.');
      return;
    }

    const success = createTask({
        title: formData.title,
        description: formData.description,
        reward: formData.reward,
        link: formData.link,
        category: formData.category,
        type: type === 'website' ? 'website' : 'task',
        duration: type === 'website' ? formData.duration : undefined
    });

    if (success) {
      setSuccess(true);
      setTimeout(() => {
        navigate(type === 'website' ? '/ad-zone' : '/tasks');
      }, 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            {type === 'website' ? <Globe size={32} /> : <PlusCircle size={32} />}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{type === 'website' ? 'Add Website' : 'Create Task'}</h1>
            <p className="text-gray-500">Promote your content to our community.</p>
          </div>
        </div>

        {success ? (
          <div className="text-center py-12">
             <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                <Check size={40} />
             </div>
             <h2 className="text-2xl font-bold text-gray-900 mb-2">Task Created Successfully!</h2>
             <p className="text-gray-500">Your task is now live and visible to users.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Task Title</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. Subscribe to YouTube"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Category</label>
                <select 
                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                   value={formData.category}
                   onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option>General</option>
                  <option>Social Media</option>
                  <option>Reviews</option>
                  <option>Website Visit</option>
                  <option>Research</option>
                  <option>Marketing</option>
                  <option>Entertainment</option>
                  <option>Technology</option>
                  <option>Education</option>
                  <option>Shopping</option>
                  <option>News</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Description</label>
              <textarea 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none h-24" 
                placeholder="Briefly describe what the user needs to do..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Link / URL</label>
              <input 
                type="url" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="https://example.com"
                value={formData.link}
                onChange={e => setFormData({...formData, link: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Reward (Coins)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" 
                    placeholder="50"
                    value={formData.reward || ''}
                    onChange={e => setFormData({...formData, reward: parseInt(e.target.value) || 0})}
                  />
                  <Wallet size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              {type === 'website' && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Duration (Seconds)</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" 
                    placeholder="15"
                    value={formData.duration}
                    onChange={e => setFormData({...formData, duration: parseInt(e.target.value) || 0})}
                  />
                </div>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl flex items-start space-x-3">
              <div className="mt-1 text-blue-600"><PlusCircle size={16} /></div>
              <p className="text-sm text-blue-800">
                A total of <span className="font-bold">{formData.reward} coins</span> will be deducted from your wallet immediately.
              </p>
            </div>

            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

            <button type="submit" className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-blue-600 transition shadow-lg shadow-gray-100">
              Create Campaign
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateTask;
