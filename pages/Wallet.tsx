
import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Wallet as WalletIcon, ArrowUpCircle, ArrowDownCircle, History, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Wallet: React.FC = () => {
  const { state } = useApp();

  if (!state.user) return <Navigate to="/login" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">My Wallet</h1>
        <p className="text-gray-500">Manage your earnings and transactions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-200">
            <p className="text-blue-100 font-medium mb-1">Total Balance</p>
            <h2 className="text-5xl font-extrabold mb-8">{state.user.balance.toFixed(0)} <span className="text-xl font-normal opacity-70">Coins</span></h2>
            
            <div className="grid grid-cols-2 gap-4">
              <Link to="/deposit" className="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition group">
                <ArrowDownCircle className="mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold">Deposit</span>
              </Link>
              <Link to="/withdraw" className="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition group">
                <ArrowUpCircle className="mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold">Withdraw</span>
              </Link>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
             <h3 className="font-bold mb-4 flex items-center">
               <History size={18} className="mr-2 text-blue-600" />
               Earning Stats
             </h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                   <span className="text-gray-500">Total Earned:</span>
                   <span className="font-bold text-green-600">+{state.user.totalEarnings}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-gray-500">Total Spent:</span>
                   <span className="font-bold text-red-600">-{state.transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-gray-500">Withdrawn:</span>
                   <span className="font-bold text-blue-600">{state.transactions.filter(t => t.type === 'withdraw' && t.status === 'approved').reduce((acc, t) => acc + t.amount, 0)}</span>
                </div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold">Transaction History</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <Filter size={18} />
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {state.transactions.length > 0 ? (
                state.transactions.map(tx => (
                  <div key={tx.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                         tx.type === 'earning' ? 'bg-green-50 text-green-600' :
                         tx.type === 'withdraw' ? 'bg-red-50 text-red-600' :
                         tx.type === 'deposit' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'
                       }`}>
                         {tx.type === 'earning' ? <TrendingUpIcon size={20} /> : <WalletIcon size={20} />}
                       </div>
                       <div>
                         <p className="font-bold text-gray-900">{tx.description}</p>
                         <p className="text-sm text-gray-500">{new Date(tx.date).toLocaleString()}</p>
                       </div>
                    </div>
                    <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                       <p className={`text-lg font-bold ${
                         tx.type === 'earning' || tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                       }`}>
                         {tx.type === 'earning' || tx.type === 'deposit' ? '+' : '-'}{tx.amount}
                       </p>
                       <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                         tx.status === 'completed' || tx.status === 'approved' ? 'bg-green-100 text-green-700' : 
                         tx.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                       }`}>
                         {tx.status}
                       </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center text-gray-400">
                   <p>No transactions found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrendingUpIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);

export default Wallet;
