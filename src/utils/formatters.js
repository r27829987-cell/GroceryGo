export const formatPrice = (price) => {
  return `₹${price.toFixed(2)}`;
};

export const getDiscountPercentage = (originalPrice, currentPrice) => {
  if (!originalPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};
