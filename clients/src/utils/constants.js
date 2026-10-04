export const ORDER_STATUS = {
  pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-700' },
  confirmed: { label: 'Confirmée', color: 'bg-blue-100 text-blue-700' },
  shipped: { label: 'Expédiée', color: 'bg-purple-100 text-purple-700' },
  delivered: { label: 'Livrée', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-700' },
};

export const SIZES = [38, 39, 40, 41, 42, 43, 44, 45];

export const PAYMENT_METHODS = [
  { value: 'cod', label: 'Paiement à la livraison' },
  { value: 'card', label: 'Carte bancaire' },
];