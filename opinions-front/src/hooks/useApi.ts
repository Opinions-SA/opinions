import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API
})

export const useApi = () => ({
    validateToken: async (token: string) => {
        return {
            user: { id: 3, name: "Murilo", email: "murilo@gmail.com"}
        }
        const response = await api.post('/validate', { token });
        return response.data;
    },
    signin: async (email: string, password:string) => {
        return {
            user: { id: 3, name: "Murilo", email: "murilo@gmail.com"},
            token: "874272388090"
        }
        const response = await api.post('/signin', {email, password});
        return response.data;
    },
    logout: async () => {
        return {
            status: true
        }
        const response = await api.post('/logout');
        return response.data;
    }
})