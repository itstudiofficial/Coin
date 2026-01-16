
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Shield, TrendingUp, DollarSign, MousePointer2, Smartphone } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    { title: 'Fast Tasks', desc: 'Complete micro-tasks and earn coins instantly.', icon: Zap },
    { title: 'Secure Platform', desc: 'Your data and earnings are protected with bank-level security.', icon: Shield },
    { title: 'Daily Bonus', desc: 'Login every day to claim your streak rewards.', icon: TrendingUp },
    { title: 'Easy Withdrawals', desc: 'Withdraw to JazzCash, Easypaisa, or Binance instantly.', icon: DollarSign },
    { title: 'Click to Earn', desc: 'Browse ads and visit websites to get paid.', icon: MousePointer2 },
    { title: 'Mobile First', desc: 'Earn on the go with our fully responsive mobile platform.', icon: Smartphone },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
            Earn Money While <br />
            <span className="text-blue-600">Surfing the Web</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10">
            Ads Predia is the world's most professional coin-earning platform. Complete tasks, watch videos, and share with friends to build your income.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition duration-300">
              Get Started Now
            </Link>
            <Link to="/login" className="px-8 py-4 bg-white border-2 border-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 hover:border-blue-200 transition duration-300">
              User Login
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">50K+</p>
              <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">2M+</p>
              <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Tasks Completed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">$100K+</p>
              <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Paid Out</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">4.9/5</p>
              <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Why Choose Ads Predia?</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
              We provide the most lucrative task management system for both earners and advertisers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="p-8 bg-white border border-gray-100 rounded-3xl hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-50 transition-all duration-300 group">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Earning?</h2>
          <p className="text-blue-100 mb-10 text-lg">Join thousands of people making money every day.</p>
          <Link to="/signup" className="px-10 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-2xl hover:bg-gray-100 transition">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
