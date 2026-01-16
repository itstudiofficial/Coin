
import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Wallet, TrendingUp, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Dashboard: React.FC = () => {
  const { state } = useApp();

  if (!state.user) return <Navigate to="/login" />;

  const stats = [
    { title: 'Current Balance', value: `${state.user.balance.toFixed(0)} Coins`, icon: Wallet, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Total Earnings', value: `${state.user.totalEarnings.toFixed(0)} Coins`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Completed Tasks', value: state.user.completedTasks, icon: CheckCircle, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Pending Withdrawals', value: state.transactions.filter(t => t.type === 'withdraw' && t.status === 'pending').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {state.user.name}!</h1>
          <p className="text-gray-500">Here's what's happening with your earnings today.</p>
        </div>
        <Link to="/tasks" className="flex items-center space-x-2 text-blue-600 font-semibold hover:underline">
          <span>Explore Tasks</span>
          <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className={`w-12 h-12 ${s.bg} rounded-2xl flex items-center justify-center ${s.color} mb-4`}>
              <s.icon size={24} />
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">{s.title}</p>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Recent Activity</h2>
              <Link to="/wallet" className="text-sm text-blue-600 hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {state.transactions.slice(0, 5).length > 0 ? (
                state.transactions.slice(0, 5).map(tx => (
                  <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'earning' ? 'bg-green-100 text-green-600' : 
                        tx.type === 'withdraw' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {tx.type === 'earning' ? <TrendingUp size={18} /> : <Wallet size={18} />}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{tx.description}</p>
                        <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${tx.type === 'earning' || tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.type === 'earning' || tx.type === 'deposit' ? '+' : '-'}{tx.amount}
                      </p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        tx.status === 'completed' || tx.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-400">No recent transactions yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-200">
            <h3 className="text-lg font-bold mb-4">Ad Campaign</h3>
            <p className="text-indigo-100 mb-6 text-sm">Want more visitors to your website? Start a campaign now and reach thousands of users.</p>
            <Link to="/add-website" className="block w-full text-center py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition">
              Promote Website
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold mb-4">Account Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Email:</span>
                <span className="font-medium">{state.user.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">User ID:</span>
                <span className="font-medium text-xs font-mono">{state.user.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Joined:</span>
                <span className="font-medium">{new Date(state.user.joinedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
