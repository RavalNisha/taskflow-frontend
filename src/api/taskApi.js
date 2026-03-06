import axios from 'axios';

// const BASE_URL = 'http://localhost:8080/api';
const BASE_URL = 'https://taskflow-api-c05w.onrender.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const taskAPI = {
  getAll: () => api.get('/tasks'),
  create: (task) => api.post('/tasks', task),
  update: (id, task) => api.put(`/tasks/${id}`, task),
  delete: (id) => api.delete(`/tasks/${id}`),
  getStats: () => api.get('/tasks/stats')
};