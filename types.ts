
export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  totalEarnings: number;
  completedTasks: number;
  joinedAt: string;
  completedTaskIds: string[];
}

export interface Transaction {
  id: string;
  type: 'earning' | 'deposit' | 'withdraw' | 'expense';
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'approved';
  description: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  link: string;
  type: 'task' | 'survey' | 'video' | 'website';
  category?: string;
  duration?: number; // seconds
}

export interface AppState {
  user: User | null;
  transactions: Transaction[];
  tasks: Task[];
  availableAds: Task[];
}