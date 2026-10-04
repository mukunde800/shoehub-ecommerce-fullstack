import api from './axios';

export const orderApi = {
  create: (data) => api.post('/orders', data),
  myOrders: () => api.get('/orders/my-orders'),
  get: (id) => api.get(`/orders/${id}`),
  all: () => api.get('/orders'),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
};