import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Auth
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
}

// Users
export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
}

// Businesses
export const businessesAPI = {
  getAll: (params) => api.get('/businesses', { params }),
  getById: (id) => api.get(`/businesses/${id}`),
  create: (data) => api.post('/businesses', data),
  update: (id, data) => api.put(`/businesses/${id}`, data),
}

// Bookings
export const bookingsAPI = {
  getAll: (params) => api.get('/bookings', { params }),
  create: (data) => api.post('/bookings', data),
  updateStatus: (id, status) => api.put(`/bookings/${id}/status`, { status }),
}

// Messages
export const messagesAPI = {
  getConversation: (id) => api.get(`/messages/${id}`),
  send: (data) => api.post('/messages', data),
}

// Reviews
export const reviewsAPI = {
  getByBusiness: (id) => api.get(`/reviews/${id}`),
  create: (data) => api.post('/reviews', data),
}

// Invoices
export const invoicesAPI = {
  generate: (data) => api.post('/invoices/generate', data),
  getByUser: (id) => api.get(`/invoices/${id}`),
}

// AI
export const aiAPI = {
  businessDescription: (data) => api.post('/ai/business-description', data),
  serviceDescription: (data) => api.post('/ai/service-description', data),
  quotation: (data) => api.post('/ai/quotation', data),
  support: (data) => api.post('/ai/support', data),
  reviewSummary: (data) => api.post('/ai/review-summary', data),
  marketingCopy: (data) => api.post('/ai/marketing-copy', data),
}

// Categories
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
}

export default api
