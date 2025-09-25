import React, { useState, useEffect } from 'react';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { BudgetForm } from './components/BudgetForm';
import { Dashboard } from './components/Dashboard';
import { BillReminders } from './components/BillReminders';
import { ReminderForm } from './components/ReminderForm';
import { SpendingTrends } from './components/SpendingTrends';
import { Expense, Budget } from './types/expense';
import { Reminder, SpendingTrend } from './types/reminder';
import { exportToCSV } from './utils/export';
import { calculateSpendingTrends } from './utils/analytics';
import { Download, Bell } from 'lucide-react';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [view, setView] = useState<'expenses' | 'budgets' | 'dashboard' | 'reminders'>('dashboard');
  const [trends, setTrends] = useState<SpendingTrend[]>([]);

  useEffect(() => {
    const calculatedTrends = Object.values(calculateSpendingTrends(expenses));
    setTrends(calculatedTrends);
  }, [expenses]);

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expense: Expense = {
      ...newExpense,
      id: crypto.randomUUID(),
    };
    setExpenses((prev) => [...prev, expense]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const handleSaveBudget = (newBudgets: Budget[]) => {
    setBudgets(newBudgets);
  };

  const handleAddReminder = (newReminder: Omit<Reminder, 'id' | 'completed'>) => {
    const reminder: Reminder = {
      ...newReminder,
      id: crypto.randomUUID(),
      completed: false,
    };
    setReminders((prev) => [...prev, reminder]);
  };

  const handleCompleteReminder = (id: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? { ...reminder, completed: true } : reminder
    ));
  };

  const handleExport = () => {
    exportToCSV(expenses);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setView('dashboard')}
              className={`px-4 py-2 rounded-md ${
                view === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setView('expenses')}
              className={`px-4 py-2 rounded-md ${
                view === 'expenses'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              Expenses
            </button>
            <button
              onClick={() => setView('budgets')}
              className={`px-4 py-2 rounded-md ${
                view === 'budgets'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              Budgets
            </button>
            <button
              onClick={() => setView('reminders')}
              className={`px-4 py-2 rounded-md ${
                view === 'reminders'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              <span className="flex items-center gap-2">
                <Bell size={20} />
                Reminders
              </span>
            </button>
            <button
              onClick={handleExport}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
            >
              <Download size={20} />
              Export CSV
            </button>
          </div>
        </div>

        <div className="grid gap-8">
          {view === 'dashboard' && (
            <>
              <Dashboard expenses={expenses} budgets={budgets} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BillReminders reminders={reminders} onComplete={handleCompleteReminder} />
                <SpendingTrends trends={trends} />
              </div>
            </>
          )}

          {view === 'expenses' && (
            <>
              <ExpenseForm onAddExpense={handleAddExpense} />
              <ExpenseList
                expenses={expenses}
                onDeleteExpense={handleDeleteExpense}
              />
            </>
          )}

          {view === 'budgets' && (
            <BudgetForm onSaveBudget={handleSaveBudget} currentBudgets={budgets} />
          )}

          {view === 'reminders' && (
            <div className="grid gap-8">
              <ReminderForm onAddReminder={handleAddReminder} />
              <BillReminders reminders={reminders} onComplete={handleCompleteReminder} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;