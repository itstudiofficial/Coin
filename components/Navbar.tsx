
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, Wallet, User, LogOut, LayoutDashboard, 
  CheckSquare, ClipboardList, PlayCircle, PlusSquare, 
  Globe, ArrowDownCircle, ArrowUpCircle, ChevronDown 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const earnLinks = [
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Surveys', path: '/surveys', icon: ClipboardList },
    { name: 'Watch Video', path: '/watch-video', icon: PlayCircle },
    { name: 'AD Zone', path: '/ad-zone', icon: Globe },
  ];

  const manageLinks = [
    { name: 'Create Task', path: '/create-task', icon: PlusSquare },
    { name: 'Add Website', path: '/add-website', icon: PlusSquare },
  ];

  const financeLinks = [
    { name: 'Wallet', path: '/wallet', icon: Wallet },
    { name: 'Deposit', path: '/deposit', icon: ArrowDownCircle },
    { name: 'Withdraw', path: '/withdraw', icon: ArrowUpCircle },
  ];

  const allLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    ...earnLinks,
    ...financeLinks,
    ...manageLinks,
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center mr-8">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Ads Predia
              </span>
            </Link>

            {/* Desktop Navigation */}
            {state.user && (
              <div className="hidden lg:flex items-center space-x-1">
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${isActive('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}
                >
                  Dashboard
                </Link>

                {/* Earn Dropdown */}
                <div className="relative group">
                  <button 
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition ${earnLinks.some(l => isActive(l.path)) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}
                  >
                    Earn <ChevronDown size={14} className="ml-1" />
                  </button>
                  <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    {earnLinks.map(link => (
                      <Link 
                        key={link.path} 
                        to={link.path} 
                        className={`flex items-center px-4 py-2 text-sm ${isActive(link.path) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        <link.icon size={16} className="mr-2" />
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Finance Dropdown */}
                <div className="relative group">
                  <button 
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition ${financeLinks.some(l => isActive(l.path)) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}
                  >
                    Finance <ChevronDown size={14} className="ml-1" />
                  </button>
                  <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    {financeLinks.map(link => (
                      <Link 
                        key={link.path} 
                        to={link.path} 
                        className={`flex items-center px-4 py-2 text-sm ${isActive(link.path) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        <link.icon size={16} className="mr-2" />
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Advertise Dropdown */}
                <div className="relative group">
                  <button 
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition ${manageLinks.some(l => isActive(l.path)) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}
                  >
                    Advertise <ChevronDown size={14} className="ml-1" />
                  </button>
                  <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    {manageLinks.map(link => (
                      <Link 
                        key={link.path} 
                        to={link.path} 
                        className={`flex items-center px-4 py-2 text-sm ${isActive(link.path) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        <link.icon size={16} className="mr-2" />
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {!state.user ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition">Login</Link>
                <Link to="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-medium shadow-md transition">Sign Up</Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2 md:space-x-6">
                <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                  <Wallet size={16} className="text-blue-600 mr-2" />
                  <span className="font-bold text-gray-900 mr-1">{state.user.balance.toFixed(0)}</span>
                  <span className="text-[10px] uppercase font-bold text-gray-400 hidden sm:inline">Coins</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="hidden md:flex p-2 text-gray-500 hover:text-red-600 transition"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            )}

            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {!state.user ? (
              <div className="flex flex-col space-y-2 p-2 pt-4">
                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-center text-gray-700 hover:bg-gray-100 rounded-2xl font-bold">Login</Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-center bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100">Sign Up</Link>
              </div>
            ) : (
              <>
                <div className="py-4 border-b border-gray-100 flex items-center justify-between mb-2">
                   <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
                        <User size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{state.user.name}</p>
                        <p className="text-xs text-gray-500">{state.user.email}</p>
                      </div>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 pb-4 border-b border-gray-100 mb-4">
                  {allLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl transition ${isActive(link.path) ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                    >
                      <link.icon size={20} className={isActive(link.path) ? 'text-white mb-2' : 'text-blue-500 mb-2'} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{link.name}</span>
                    </Link>
                  ))}
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full px-4 py-4 text-red-600 font-bold bg-red-50 rounded-2xl hover:bg-red-100 transition"
                >
                  <LogOut size={20} className="mr-3" />
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
