import React from 'react';
import { format } from 'date-fns';
import { Bell, CheckCircle2 } from 'lucide-react';
import { Reminder } from '../types/reminder';
import { formatIndianCurrency } from '../utils/currency';

type BillRemindersProps = {
  reminders: Reminder[];
  onComplete: (id: string) => void;
};

export function BillReminders({ reminders, onComplete }: BillRemindersProps) {
  const upcomingReminders = reminders
    .filter(reminder => !reminder.completed)
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="text-blue-600" />
        <h2 className="text-2xl font-bold">Upcoming Bills</h2>
      </div>
      
      <div className="space-y-4">
        {upcomingReminders.map(reminder => (
          <div
            key={reminder.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <h3 className="font-semibold">{reminder.title}</h3>
              <p className="text-sm text-gray-600">
                Due: {format(reminder.dueDate, 'MMM dd, yyyy')}
              </p>
              <p className="text-sm text-gray-600">
                {reminder.recurring && `Recurring: ${reminder.frequency}`}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold">{formatIndianCurrency(reminder.amount)}</span>
              <button
                onClick={() => onComplete(reminder.id)}
                className="p-2 text-green-600 hover:text-green-800"
              >
                <CheckCircle2 size={20} />
              </button>
            </div>
          </div>
        ))}
        
        {upcomingReminders.length === 0 && (
          <p className="text-center text-gray-500">No upcoming bills</p>
        )}
      </div>
    </div>
  );
}