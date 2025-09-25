import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { SpendingTrend } from '../types/reminder';
import { categories } from '../data/categories';
import { formatIndianCurrency } from '../utils/currency';

type SpendingTrendsProps = {
  trends: SpendingTrend[];
};

export function SpendingTrends({ trends }: SpendingTrendsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Spending Trends</h2>
      
      <div className="space-y-4">
        {trends.map(trend => {
          const category = categories.find(c => c.id === trend.category);
          const isIncrease = trend.trend > 0;
          
          return (
            <div
              key={trend.category}
              className="p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="px-2 py-1 rounded-full text-sm"
                  style={{ backgroundColor: category?.color + '20', color: category?.color }}
                >
                  {category?.name}
                </span>
                <div className="flex items-center gap-1">
                  {isIncrease ? (
                    <TrendingUp className="text-red-500" size={16} />
                  ) : (
                    <TrendingDown className="text-green-500" size={16} />
                  )}
                  <span className={isIncrease ? 'text-red-500' : 'text-green-500'}>
                    {Math.abs(trend.trend).toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-gray-600">Current Month</p>
                  <p className="font-semibold">{formatIndianCurrency(trend.currentMonth)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Previous Month</p>
                  <p className="font-semibold">{formatIndianCurrency(trend.previousMonth)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}