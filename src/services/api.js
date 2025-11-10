import axios from 'axios';
import { API_BASE_URL } from '../config';


const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

// Attach token for each request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);

// Employee
export const getUserData = () => API.get('/user/me');

export const submitResignation = (data) => API.post('/user/resign', data);
export const resignationStatus = () => API.get('/user/resign-status');

// Admin
export const getAllResignations = () => API.get('/admin/resignations');
export const concludeResignation = (data) => API.put('/admin/conclude_resignation', data);
export const getAllExitResponses = () => API.get('/admin/exit_responses');

export default API;
