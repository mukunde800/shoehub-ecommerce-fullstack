import api from './axios';

export const productApi = {
  list: (params) => api.get('/products', { params }),
  get: (slug) => api.get(`/products/${slug}`),
  featured: () => api.get('/products/featured'),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  remove: (id) => api.delete(`/products/${id}`),
};

export const categoryApi = {
  list: () => api.get('/categories'),
  get: (slug) => api.get(`/categories/${slug}`),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  remove: (id) => api.delete(`/categories/${id}`),
};