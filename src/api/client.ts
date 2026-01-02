import axios from 'axios';

// Defaults to the env var provided by Vite based on mode
export const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
    console.warn('VITE_API_URL is not defined in the environment. API calls may fail.');
}

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
