export type Reminder = {
  id: string;
  title: string;
  amount: number;
  dueDate: Date;
  category: string;
  recurring: boolean;
  frequency?: 'monthly' | 'quarterly' | 'yearly';
  completed: boolean;
};

export type SpendingTrend = {
  category: string;
  currentMonth: number;
  previousMonth: number;
  trend: number; // percentage change
};