import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

export const getExperiences = () => api.get('/experiences');
export const getExperience = (id: string) => api.get(`/experiences/${id}`);
export const validatePromo = (code: string) => api.post('/promo/validate', { code });
export const createBooking = (payload: any) => api.post('/bookings', payload);

export default api;
