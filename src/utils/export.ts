import { Expense } from '../types/expense';
import { categories } from '../data/categories';
import { formatIndianCurrency } from './currency';

export function exportToCSV(expenses: Expense[]): void {
  const headers = ['Date', 'Category', 'Description', 'Amount (INR)'];
  
  const rows = expenses.map((expense) => {
    const category = categories.find((c) => c.id === expense.category);
    return [
      expense.date.toLocaleDateString('en-IN'),
      category?.name || '',
      expense.description,
      formatIndianCurrency(expense.amount),
    ];
  });

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `expenses-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}