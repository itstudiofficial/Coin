
import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Lock, Mail, User, ArrowRight } from 'lucide-react';

interface AuthProps {
  type: 'login' | 'signup';
}

const Auth: React.FC<AuthProps> = ({ type }) => {
  const { state, login } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  if (state.user) return <Navigate to="/dashboard" />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || (type === 'signup' && !formData.name)) {
      setError('Please fill all required fields.');
      return;
    }
    
    if (type === 'signup' && formData.password !== formData.confirm) {
      setError('Passwords do not match.');
      return;
    }

    login(formData.email, formData.name || formData.email.split('@')[0]);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-gray-50">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {type === 'login' ? 'Welcome Back' : 'Join Ads Predia'}
              </h1>
              <p className="text-gray-500">
                {type === 'login' ? 'Enter your details to start earning.' : 'Create an account and get 100 coins bonus.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {type === 'signup' && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Full Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" 
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                    <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" 
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                  <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                  />
                  <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {type === 'signup' && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" 
                      placeholder="••••••••"
                      value={formData.confirm}
                      onChange={e => setFormData({...formData, confirm: e.target.value})}
                    />
                    <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              )}

              {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

              <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all flex items-center justify-center">
                {type === 'login' ? 'Login' : 'Create Account'}
                <ArrowRight size={20} className="ml-2" />
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-500">
              {type === 'login' ? (
                <>
                  Don't have an account? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Sign Up</Link>
                </>
              ) : (
                <>
                  Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
