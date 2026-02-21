import axios from 'axios';

// Create an Axios instance with a placeholder base URL
// In a real app, this would be an environment variable like import.meta.env.VITE_API_URL
const api = axios.create({
    baseURL: 'https://api.placeholder.com/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a response interceptor to handle errors globally if needed
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle error globally
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default api;
