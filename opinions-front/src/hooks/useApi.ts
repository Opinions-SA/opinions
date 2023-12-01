import axios, { AxiosResponse } from 'axios';
import { AuthResponse } from '../interface/AuthResponse';
import { FieldResponse } from '../interface/FieldResponse';
import { User } from '../interface/User';
import { Review } from '../interface/Review';

const api = axios.create({
    baseURL: import.meta.env.VITE_API
})

interface AuthApi {
    validateToken: (token: string) => Promise<AuthResponse>;
    signin: (username: string, password: string) => Promise<AuthResponse>;
    signup: (username: string, email: string, password: string) => Promise<AuthResponse>;
    edit: (username: string, email: string, phone: string) => Promise<AuthResponse>;
    logout: (token: string) => Promise<AuthResponse>;
    validateField: (field: string, value: string) => Promise<Boolean>;
    reviewCreate: (token: string, streamingId: number, streamingType: string, user: User, title: string, description: string, rate: number) => Promise<Review | null>;
    reviewGet: (token: string, streamingId: number, streamingType: string) => Promise<Review | null>;
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
    edit: async (username: string, email: string, phone: string) => {
        const response: AxiosResponse<AuthResponse> = await api.post('/user/update', { username, email, phone });
        return response.data;
    },
    logout: async (token: string) => {
        const response: AxiosResponse<AuthResponse> = await api.post('/auth/logout', { token });
        return response.data;
    },
    validateField: async (field: string, value: string) => {
        const response: AxiosResponse<FieldResponse> = await api.post('/auth/field/' + field, { value });
        return response.data.field;
    },
    reviewCreate: async (token: string, streamingId: number, streamingType: string, user: User, title: string, description: string, rate: number) => {
        const response: AxiosResponse<Review> = await api.post('/review', { streaming_id: streamingId, streaming_type: streamingType, user, title, description, rate}, { headers: {Authorization: token}});
        return response.data;
    },
    reviewGet: async (token: string, streamingId: number, streamingType: string) => {
        const response: AxiosResponse<Review[]> = await api.get('/review/user', { params: {streamingId, streamingType}, headers: {Authorization: token}});
        return response.data[0];
    }
});