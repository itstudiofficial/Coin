
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Transaction, Task, AppState } from '../types';
import { INITIAL_TASKS, INITIAL_SURVEYS, INITIAL_VIDEOS, INITIAL_WEBSITES } from '../constants';

interface AppContextType {
  state: AppState;
  login: (email: string, name: string) => void;
  logout: () => void;
  addCoins: (amount: number, description: string) => void;
  deductCoins: (amount: number, description: string) => void;
  createTask: (task: Omit<Task, 'id'>) => boolean;
  completeTask: (taskId: string) => void;
  deposit: (method: string, amount: number, trxId: string) => void;
  withdraw: (method: string, amount: number) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('ads_predia_state');
    if (saved) return JSON.parse(saved);
    return {
      user: null,
      transactions: [],
      tasks: [...INITIAL_TASKS, ...INITIAL_SURVEYS, ...INITIAL_VIDEOS],
      availableAds: INITIAL_WEBSITES
    };
  });

  useEffect(() => {
    localStorage.setItem('ads_predia_state', JSON.stringify(state));
  }, [state]);

  const login = (email: string, name: string) => {
    setState(prev => ({
      ...prev,
      user: {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        balance: 100, // Welcome bonus
        totalEarnings: 0,
        completedTasks: 0,
        joinedAt: new Date().toISOString(),
        completedTaskIds: []
      }
    }));
  };

  const logout = () => {
    setState(prev => ({ ...prev, user: null }));
  };

  const addCoins = (amount: number, description: string) => {
    if (!state.user) return;
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'earning',
      amount,
      date: new Date().toISOString(),
      status: 'completed',
      description
    };
    setState(prev => ({
      ...prev,
      user: prev.user ? {
        ...prev.user,
        balance: prev.user.balance + amount,
        totalEarnings: prev.user.totalEarnings + amount
      } : null,
      transactions: [newTransaction, ...prev.transactions]
    }));
  };

  const deductCoins = (amount: number, description: string) => {
    if (!state.user || state.user.balance < amount) return;
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'expense',
      amount,
      date: new Date().toISOString(),
      status: 'completed',
      description
    };
    setState(prev => ({
      ...prev,
      user: prev.user ? {
        ...prev.user,
        balance: prev.user.balance - amount
      } : null,
      transactions: [newTransaction, ...prev.transactions]
    }));
  };

  const createTask = (task: Omit<Task, 'id'>) => {
    if (!state.user || state.user.balance < task.reward) return false;
    const newTask: Task = { ...task, id: Math.random().toString(36).substr(2, 9) };
    deductCoins(task.reward, `Created task: ${task.title}`);
    setState(prev => ({
      ...prev,
      tasks: [newTask, ...prev.tasks]
    }));
    return true;
  };

  const completeTask = (taskId: string) => {
    const task = [...state.tasks, ...state.availableAds].find(t => t.id === taskId);
    if (task && state.user) {
      // Check if already completed
      if (state.user.completedTaskIds.includes(taskId)) return;

      addCoins(task.reward, `Completed: ${task.title}`);
      setState(prev => ({
        ...prev,
        user: prev.user ? { 
          ...prev.user, 
          completedTasks: prev.user.completedTasks + 1,
          completedTaskIds: [...prev.user.completedTaskIds, taskId]
        } : null
      }));
    }
  };

  const deposit = (method: string, amount: number, trxId: string) => {
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'deposit',
      amount,
      date: new Date().toISOString(),
      status: 'pending',
      description: `Deposit via ${method} (TRX: ${trxId})`
    };
    setState(prev => ({
      ...prev,
      transactions: [newTransaction, ...prev.transactions]
    }));
    // Simulate approval after 5 seconds
    setTimeout(() => {
        setState(prev => {
            const txs = prev.transactions.map(tx => tx.id === newTransaction.id ? { ...tx, status: 'approved' as const } : tx);
            return {
                ...prev,
                transactions: txs,
                user: prev.user ? { ...prev.user, balance: prev.user.balance + amount } : null
            };
        });
    }, 5000);
  };

  const withdraw = (method: string, amount: number) => {
    if (!state.user || state.user.balance < amount) return false;
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'withdraw',
      amount,
      date: new Date().toISOString(),
      status: 'pending',
      description: `Withdrawal via ${method}`
    };
    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, balance: prev.user.balance - amount } : null,
      transactions: [newTransaction, ...prev.transactions]
    }));
    return true;
  };

  return (
    <AppContext.Provider value={{ state, login, logout, addCoins, deductCoins, createTask, completeTask, deposit, withdraw }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('useApp must be used within an AppProvider');
  return context;
};