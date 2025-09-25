import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { categories } from '../data/categories';
import { Reminder } from '../types/reminder';

type ReminderFormProps = {
  onAddReminder: (reminder: Omit<Reminder, 'id' | 'completed'>) => void;
};

export function ReminderForm({ onAddReminder }: ReminderFormProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [frequency, setFrequency] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || !category || !dueDate) return;

    onAddReminder({
      title,
      amount: parseFloat(amount),
      category,
      dueDate: new Date(dueDate),
      recurring,
      frequency: recurring ? frequency : undefined,
    });

    // Reset form
    setTitle('');
    setAmount('');
    setCategory('');
    setDueDate('');
    setRecurring(false);
    setFrequency('monthly');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Bill Reminder</h2>
      
      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="e.g., Electricity Bill"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="recurring"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="recurring" className="text-sm font-medium text-gray-700">
            Recurring Bill
          </label>
        </div>

        {recurring && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as 'monthly' | 'quarterly' | 'yearly')}
              className="w-full p-2 border rounded-md"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <PlusCircle size={20} />
          Add Reminder
        </button>
      </div>
    </form>
  );
}