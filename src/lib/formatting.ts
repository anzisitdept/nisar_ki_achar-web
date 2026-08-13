export function formatCurrency(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-PK', { maximumFractionDigits: 0 })}`;
}

export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}
