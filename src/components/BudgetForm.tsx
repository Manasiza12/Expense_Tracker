import React, { useState } from 'react';
import { categories } from '../data/categories';
import { Budget } from '../types/expense';

type BudgetFormProps = {
  onSaveBudget: (budgets: Budget[]) => void;
  currentBudgets: Budget[];
};

export function BudgetForm({ onSaveBudget, currentBudgets }: BudgetFormProps) {
  const [budgets, setBudgets] = useState<Budget[]>(currentBudgets);

  const handleBudgetChange = (categoryId: string, amount: string) => {
    const newBudgets = [...budgets];
    const index = newBudgets.findIndex((b) => b.categoryId === categoryId);
    
    if (index >= 0) {
      newBudgets[index] = { categoryId, amount: parseFloat(amount) || 0 };
    } else {
      newBudgets.push({ categoryId, amount: parseFloat(amount) || 0 });
    }
    
    setBudgets(newBudgets);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveBudget(budgets);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Set Monthly Budgets</h2>
      
      <div className="grid gap-4">
        {categories.map((category) => {
          const budget = budgets.find((b) => b.categoryId === category.id);
          return (
            <div key={category.id} className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {category.name}
                </label>
                <input
                  type="number"
                  value={budget?.amount || ''}
                  onChange={(e) => handleBudgetChange(category.id, e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
            </div>
          );
        })}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Save Budgets
        </button>
      </div>
    </form>
  );
}