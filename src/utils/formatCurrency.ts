/**
  * Formats a numeric amount as Indian Rupees (INR / ₹) with standard locale grouping.
  * Example: 1499 => "₹1,499"
  */
export const formatINR = (amount: number): string => {
  if (isNaN(amount)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};
