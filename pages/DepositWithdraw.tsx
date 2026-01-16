
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { CreditCard, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface DepositWithdrawProps {
  type: 'deposit' | 'withdraw';
}

const DepositWithdraw: React.FC<DepositWithdrawProps> = ({ type }) => {
  const { state, deposit, withdraw } = useApp();
  const navigate = useNavigate();
  const [method, setMethod] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [trxId, setTrxId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!state.user) return <Navigate to="/login" />;

  const methods = [
    { id: 'easypaisa', name: 'Easypaisa', color: 'bg-green-100 text-green-700' },
    { id: 'jazzcash', name: 'JazzCash', color: 'bg-red-100 text-red-700' },
    { id: 'binance', name: 'Binance (USDT)', color: 'bg-amber-100 text-amber-700' },
    { id: 'payeer', name: 'Payeer', color: 'bg-blue-100 text-blue-700' },
    { id: 'bank', name: 'Bank Transfer', color: 'bg-gray-100 text-gray-700' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!method || amount <= 0) {
      setError('Please select a method and enter a valid amount.');
      return;
    }

    if (type === 'withdraw') {
      if (amount < 500) {
        setError('Minimum withdrawal limit is 500 coins.');
        return;
      }
      if (state.user!.balance < amount) {
        setError('Insufficient balance.');
        return;
      }
      const success = withdraw(method, amount);
      if (success) {
        setSuccess(true);
        setTimeout(() => navigate('/wallet'), 2000);
      }
    } else {
      if (!trxId) {
        setError('Please enter your Transaction ID for verification.');
        return;
      }
      deposit(method, amount, trxId);
      setSuccess(true);
      setTimeout(() => navigate('/wallet'), 2000);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-blue-600 mb-6 transition">
          <ArrowLeft size={18} className="mr-2" />
          Go Back
        </button>

        <h1 className="text-2xl font-bold mb-2 capitalize">{type} Funds</h1>
        <p className="text-gray-500 mb-8">
          {type === 'deposit' 
            ? 'Add coins to your wallet to create tasks.' 
            : 'Withdraw your earned coins to your local account.'}
        </p>

        {success ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-xl font-bold mb-2">Request Submitted!</h2>
            <p className="text-gray-500">
                {type === 'deposit' 
                  ? 'Your deposit will be verified within 30 minutes.' 
                  : 'Your withdrawal request is pending approval.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700">Select Method</label>
              <div className="grid grid-cols-1 gap-3">
                {methods.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.name)}
                    className={`flex items-center justify-between px-4 py-4 rounded-2xl border-2 transition ${
                      method === m.name ? 'border-blue-600 bg-blue-50' : 'border-gray-50 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${m.color}`}>
                          <CreditCard size={16} />
                       </div>
                       <span className="font-bold">{m.name}</span>
                    </div>
                    {method === m.name && <div className="w-4 h-4 rounded-full bg-blue-600"></div>}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Amount (Coins)</label>
              <input 
                type="number" 
                className="w-full px-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg" 
                placeholder="Minimum 500"
                value={amount || ''}
                onChange={e => setAmount(parseInt(e.target.value) || 0)}
              />
            </div>

            {type === 'deposit' && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Transaction ID (TRX ID)</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none font-mono" 
                  placeholder="Enter TrxID after sending"
                  value={trxId}
                  onChange={e => setTrxId(e.target.value)}
                />
              </div>
            )}

            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

            <button type="submit" className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition shadow-lg shadow-gray-100 flex items-center justify-center">
              Confirm {type === 'deposit' ? 'Deposit' : 'Withdrawal'}
              <ArrowRight size={20} className="ml-2" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default DepositWithdraw;
