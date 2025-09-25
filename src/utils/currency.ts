export function formatIndianCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

// Convert large numbers to Indian format (e.g., 1,00,000)
export function formatIndianNumber(number: number): string {
  return number.toLocaleString('en-IN');
}