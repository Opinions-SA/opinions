import axios, { AxiosResponse } from 'axios';
import { AuthResponse } from '../interface/AuthResponse';

const api = axios.create({
    baseURL: import.meta.env.VITE_API
})

interface AuthApi {
    validateToken: (token: string) => Promise<AuthResponse>;
    signin: (username: string, password: string) => Promise<AuthResponse>;
    logout: (token: string) => Promise<AuthResponse>;
}

export const useApi = (): AuthApi => ({
    validateToken: async (token: string) => {
        const response: AxiosResponse<AuthResponse> = await api.post('/auth/validate', { token });
        return response.data;
    },
    signin: async (username: string, password: string) => {
        const response: AxiosResponse<AuthResponse> = await api.post('/auth/login', { username, password });
        return response.data;
    },
    logout: async (token: string) => {
        const response: AxiosResponse<AuthResponse> = await api.post('/auth/logout', { token });
        return response.data;
    }
});