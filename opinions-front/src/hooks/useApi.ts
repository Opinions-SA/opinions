import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API
})

export const useApi = () => ({
    validateToken: async (token: string) => {
        const response = await api.post('/auth/validate', { token });
        return response.data;
    },
    signin: async (email: string, password:string) => {
        const response = await api.post('/auth/login', {email, password});
        return response.data;
    },
    logout: async (token: String) => {
        const response = await api.post('/auth/logout', { token });
        return response.data;
    }
})