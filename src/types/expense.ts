export type Category = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

export type Expense = {
  id: string;
  amount: number;
  category: string;
  date: Date;
  description: string;
};

export type Budget = {
  categoryId: string;
  amount: number;
};

export type MonthlyBudget = {
  month: string;
  budgets: Budget[];
};