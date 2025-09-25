import { Expense } from '../types/expense';
import { SpendingTrend } from '../types/reminder';
import { startOfMonth, subMonths, isWithinInterval } from 'date-fns';

export function calculateSpendingTrends(expenses: Expense[]): SpendingTrend[] {
  const currentDate = new Date();
  const currentMonthStart = startOfMonth(currentDate);
  const previousMonthStart = startOfMonth(subMonths(currentDate, 1));

  return expenses.reduce((trends: { [key: string]: SpendingTrend }, expense) => {
    const category = expense.category;
    
    if (!trends[category]) {
      trends[category] = {
        category,
        currentMonth: 0,
        previousMonth: 0,
        trend: 0
      };
    }

    if (isWithinInterval(expense.date, { start: currentMonthStart, end: currentDate })) {
      trends[category].currentMonth += expense.amount;
    } else if (isWithinInterval(expense.date, { start: previousMonthStart, end: currentMonthStart })) {
      trends[category].previousMonth += expense.amount;
    }

    trends[category].trend = calculateTrendPercentage(
      trends[category].previousMonth,
      trends[category].currentMonth
    );

    return trends;
  }, {});
}

function calculateTrendPercentage(previous: number, current: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}