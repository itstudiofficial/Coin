
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import TaskList from './pages/TaskList';
import Wallet from './pages/Wallet';
import CreateTask from './pages/CreateTask';
import DepositWithdraw from './pages/DepositWithdraw';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Auth type="login" />} />
              <Route path="/signup" element={<Auth type="signup" />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<TaskList type="task" title="Daily Tasks" />} />
              <Route path="/surveys" element={<TaskList type="survey" title="Paid Surveys" />} />
              <Route path="/watch-video" element={<TaskList type="video" title="Video Ads" />} />
              <Route path="/ad-zone" element={<TaskList type="website" title="Website Ad Zone" />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/create-task" element={<CreateTask type="task" />} />
              <Route path="/add-website" element={<CreateTask type="website" />} />
              <Route path="/deposit" element={<DepositWithdraw type="deposit" />} />
              <Route path="/withdraw" element={<DepositWithdraw type="withdraw" />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          
          <footer className="bg-white border-t border-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">Ads Predia</p>
              <div className="flex justify-center space-x-6 mb-6">
                <a href="#" className="text-gray-400 hover:text-blue-600 transition">Terms</a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition">Help</a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition">Contact</a>
              </div>
              <p className="text-gray-400 text-sm">© 2024 Ads Predia. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
