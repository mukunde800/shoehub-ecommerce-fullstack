import api from './axios';

export const cartApi = {
  get: () => api.get('/cart'),
  add: (data) => api.post('/cart', data),
  updateItem: (itemId, quantity) => api.put(`/cart/items/${itemId}`, { quantity }),
  removeItem: (itemId) => api.delete(`/cart/items/${itemId}`),
  clear: () => api.delete('/cart'),
};