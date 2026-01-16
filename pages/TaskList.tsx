
import React, { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  CheckSquare, ExternalLink, Timer, Play, Check, 
  Search, Filter, SlidersHorizontal, ArrowUpDown, 
  X, ChevronDown, Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Task } from '../types';

interface TaskListProps {
  type: 'task' | 'survey' | 'video' | 'website';
  title: string;
}

type SortOption = 'newest' | 'reward-high' | 'reward-low' | 'duration-short' | 'duration-long';

const TaskList: React.FC<TaskListProps> = ({ type, title }) => {
  const { state, completeTask } = useApp();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  // Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [minReward, setMinReward] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);

  if (!state.user) return <Navigate to="/login" />;

  const baseTasks = useMemo(() => {
    return [...state.tasks, ...state.availableAds].filter(t => t.type === type);
  }, [state.tasks, state.availableAds, type]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    baseTasks.forEach(t => {
      if (t.category) cats.add(t.category);
    });
    return ['All', ...Array.from(cats)];
  }, [baseTasks]);

  const filteredTasks = useMemo(() => {
    let result = baseTasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesReward = task.reward >= minReward;
      const matchesCategory = selectedCategory === 'All' || task.category === selectedCategory;
      
      return matchesSearch && matchesReward && matchesCategory;
    });

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'reward-high': return b.reward - a.reward;
        case 'reward-low': return a.reward - b.reward;
        case 'duration-short': return (a.duration || 0) - (b.duration || 0);
        case 'duration-long': return (b.duration || 0) - (a.duration || 0);
        case 'newest': 
        default: return 0; // In a real app, we'd use IDs or timestamps
      }
    });

    return result;
  }, [baseTasks, searchQuery, minReward, selectedCategory, sortBy]);

  const handleComplete = (task: Task) => {
    if (task.duration) {
      setActiveTask(task);
      setTimeLeft(task.duration);
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      window.open(task.link, '_blank');
      completeTask(task.id);
    }
  };

  const handleFinishTimedTask = () => {
    if (activeTask) {
      completeTask(activeTask.id);
      setActiveTask(null);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setMinReward(0);
    setSelectedCategory('All');
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500">Complete tasks to earn coins instantly.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center px-4 py-2.5 rounded-xl font-bold transition border ${
              showFilters ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
            }`}
          >
            <SlidersHorizontal size={18} className="mr-2" />
            Filters
            {(minReward > 0 || selectedCategory !== 'All') && (
              <span className="ml-2 w-5 h-5 bg-white text-blue-600 rounded-full text-[10px] flex items-center justify-center">!</span>
            )}
          </button>

          <div className="relative group">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-white border border-gray-200 text-gray-700 px-4 py-2.5 pr-10 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:border-blue-300 transition"
            >
              <option value="newest">Newest First</option>
              <option value="reward-high">Highest Reward</option>
              <option value="reward-low">Lowest Reward</option>
              <option value="duration-short">Shortest Time</option>
              <option value="duration-long">Longest Time</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Expanded Filters Panel */}
      {showFilters && (
        <div className="bg-white border border-gray-100 rounded-3xl p-6 mb-8 shadow-sm animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 flex items-center">
                <ArrowUpDown size={14} className="mr-2" />
                Minimum Reward
              </label>
              <div className="flex items-center space-x-4">
                <input 
                  type="range" 
                  min="0" 
                  max="500" 
                  step="10"
                  value={minReward}
                  onChange={(e) => setMinReward(parseInt(e.target.value))}
                  className="flex-grow accent-blue-600"
                />
                <span className="font-bold text-blue-600 min-w-[60px] text-right">{minReward}+</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 flex items-center">
                <Filter size={14} className="mr-2" />
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-end justify-end">
              <button 
                onClick={clearFilters}
                className="flex items-center text-sm text-red-500 font-bold hover:underline"
              >
                <X size={14} className="mr-1" />
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTask && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
            <div className="mb-6 relative w-24 h-24 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                    <circle 
                        cx="48" cy="48" r="45" 
                        stroke="currentColor" strokeWidth="6" 
                        fill="transparent" className="text-gray-100" 
                    />
                    <circle 
                        cx="48" cy="48" r="45" 
                        stroke="currentColor" strokeWidth="6" 
                        fill="transparent" className="text-blue-600 transition-all duration-1000"
                        strokeDasharray={283}
                        strokeDashoffset={283 - (283 * timeLeft / (activeTask.duration || 1))}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{timeLeft}s</span>
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">{activeTask.title}</h2>
            <p className="text-gray-500 mb-8">Please stay on this page to claim your rewards.</p>
            {timeLeft === 0 ? (
              <button 
                onClick={handleFinishTimedTask}
                className="w-full py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition"
              >
                Claim {activeTask.reward} Coins
              </button>
            ) : (
              <button disabled className="w-full py-4 bg-gray-100 text-gray-400 rounded-xl font-bold cursor-not-allowed">
                Watching...
              </button>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => {
          const isDone = state.user?.completedTaskIds.includes(task.id);
          return (
            <div key={task.id} className={`relative bg-white rounded-3xl border-2 transition-all flex flex-col group overflow-hidden ${
              isDone 
                ? 'border-green-500/30 bg-green-50/10 opacity-90' 
                : 'border-gray-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-gray-100'
            }`}>
              {isDone && (
                <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-bl-2xl text-[10px] font-bold uppercase tracking-widest z-10 flex items-center shadow-sm">
                  <Award size={12} className="mr-1" />
                  Completed
                </div>
              )}
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl transition group-hover:scale-110 ${isDone ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                    {isDone ? <Check size={20} /> : (type === 'video' ? <Play size={20} /> : <CheckSquare size={20} />)}
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-extrabold ${isDone ? 'text-green-600' : 'text-blue-600'}`}>
                      {isDone ? 'Earned' : `+${task.reward}`} Coins
                    </p>
                    <div className="flex items-center justify-end text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider">
                      {task.category && (
                        <span className="mr-2 px-1.5 py-0.5 bg-gray-50 rounded">{task.category}</span>
                      )}
                      {task.duration && (
                        <div className="flex items-center">
                          <Timer size={10} className="mr-1" />
                          {task.duration}s
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <h3 className={`text-lg font-bold mb-2 transition ${isDone ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                <p className={`text-sm mb-6 flex-grow transition ${isDone ? 'text-gray-400' : 'text-gray-600'}`}>
                  {task.description}
                </p>
                
                <button
                  disabled={isDone}
                  onClick={() => handleComplete(task)}
                  className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center transition-all ${
                    isDone 
                      ? 'bg-green-100 text-green-700 cursor-default border border-green-200' 
                      : 'bg-gray-900 text-white hover:bg-blue-600 hover:-translate-y-0.5 shadow-md hover:shadow-blue-200'
                  }`}
                >
                  {isDone ? (
                    <>
                      <Check size={18} className="mr-2" />
                      Success
                    </>
                  ) : (
                    <>
                      {task.duration ? 'Start Now' : 'Complete Task'}
                      <ExternalLink size={16} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {filteredTasks.length === 0 && (
          <div className="col-span-full py-20 text-center">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
               <Search size={40} />
             </div>
             <h3 className="text-xl font-bold text-gray-900">No matching tasks found</h3>
             <p className="text-gray-500 mb-6">Try adjusting your filters or search terms.</p>
             <button 
              onClick={clearFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
             >
               Clear All Filters
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;