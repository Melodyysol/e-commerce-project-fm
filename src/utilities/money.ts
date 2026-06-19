export function formatCurrency(price: number) {
  const calculatedPrice = price / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(calculatedPrice);
}
