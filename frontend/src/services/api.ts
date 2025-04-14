import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Altere se seu backend estiver em outra porta ou caminho
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
