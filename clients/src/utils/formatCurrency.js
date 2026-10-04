export const formatCurrency = (amount, currency = 'DH') =>
  `${parseFloat(amount || 0).toFixed(2)} ${currency}`;