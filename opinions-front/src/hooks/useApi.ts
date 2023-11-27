import axios, { AxiosResponse } from 'axios';
import { AuthResponse } from '../interface/AuthResponse';
import { FieldResponse } from '../interface/FieldResponse';

const api = axios.create({
    baseURL: import.meta.env.VITE_API
})

interface AuthApi {
    validateToken: (token: string) => Promise<AuthResponse>;
    signin: (username: string, password: string) => Promise<AuthResponse>;
    signup: (username: string, email: string, password: string) => Promise<AuthResponse>;
    logout: (token: string) => Promise<AuthResponse>;
    validateField: (field: string, value: string) => Promise<Boolean>;
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
    signup: async (username: string, email: string, password: string) => {
        const response: AxiosResponse<AuthResponse> = await api.post('/auth/register', { username, email, password });
        return response.data;
    },
    logout: async (token: string) => {
        const response: AxiosResponse<AuthResponse> = await api.post('/auth/logout', { token });
        return response.data;
    },
    validateField: async (field: string, value: string) => {
        const response: AxiosResponse<FieldResponse> = await api.post('/auth/field/' + field, { value });
        return response.data.field;
    }
});