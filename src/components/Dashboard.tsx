import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { categories } from '../data/categories';
import { Expense, Budget } from '../types/expense';
import { formatIndianCurrency } from '../utils/currency';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type DashboardProps = {
  expenses: Expense[];
  budgets: Budget[];
};

export function Dashboard({ expenses, budgets }: DashboardProps) {
  const categoryExpenses = categories.map((category) => {
    const total = expenses
      .filter((e) => e.category === category.id)
      .reduce((sum, e) => sum + e.amount, 0);
    return {
      category: category.name,
      total,
      color: category.color,
    };
  });

  const pieData = {
    labels: categoryExpenses.map((c) => c.category),
    datasets: [
      {
        data: categoryExpenses.map((c) => c.total),
        backgroundColor: categoryExpenses.map((c) => c.color),
      },
    ],
  };

  const barData = {
    labels: categories.map((c) => c.name),
    datasets: [
      {
        label: 'Spent',
        data: categoryExpenses.map((c) => c.total),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Budget',
        data: categories.map((category) => {
          const budget = budgets.find((b) => b.categoryId === category.id);
          return budget?.amount || 0;
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const totalSpent = categoryExpenses.reduce((sum, c) => sum + c.total, 0);
  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Spending by Category</h2>
        <Pie data={pieData} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Budget vs. Actual</h2>
        <Bar
          data={barData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => formatIndianCurrency(Number(value)),
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const value = context.raw as number;
                    return formatIndianCurrency(value);
                  },
                },
              },
            },
          }}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
        <h2 className="text-2xl font-bold mb-6">Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600">Total Spent</p>
            <p className="text-2xl font-bold text-blue-800">
              {formatIndianCurrency(totalSpent)}
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-600">Total Budget</p>
            <p className="text-2xl font-bold text-green-800">
              {formatIndianCurrency(totalBudget)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}