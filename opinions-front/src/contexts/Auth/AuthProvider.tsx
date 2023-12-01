import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { User } from "../../interface/User";
import { useApi } from "../../hooks/useApi";

export const AuthProvider = ({ children }: { children: JSX.Element}) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const api = useApi();

    useEffect(() => {
        const validadeToken = async () => {
            const storageData = localStorage.getItem('authToken');
            if(storageData) {
                try {
                    const data = await api.validateToken(storageData)
                    if (data.user) {
                        setUser(data.user);
                    } 
                } catch (error: any) {
                    alert(error.response?.data?.message || "Erro desconhecido");
                }
            } else {
                setUser(null);
                tokenSetter("");
            }
        }
        validadeToken();
    }, []);

    const signin = async (email: string, password: string) => {
        try {
            const data = await api.signin(email, password);
            if (data.user && data.token) {
                setUser(data.user);
                tokenSetter(data.token);
                return true;
            } 
        } catch (error: any) {
            alert(error.response?.data?.message || "Erro desconhecido");
        }
        return false;
    }

    const signup = async (username: string, email: string, password: string) => {
        try {
            const data = await api.signup(username, email, password);
            if (data.user) {
                return true;
            } 
        } catch (error: any) {
            alert(error.response?.data?.message || "Erro desconhecido");
        }
        return false;
    }

    const edit = async (username: string, email: string, phone: string) => {
        try {
            const data = await api.edit(username, email, phone);
            if (data.user) {
                setUser(data.user);
                return true;
            } 
        } catch (error: any) {
            alert(error.response?.data?.message || "Erro desconhecido");
        }
        return false;
    }

    const signout = async () => {
        // const storageData = localStorage.getItem('authToken');
        // await api.logout(storageData ? storageData : "");
        setUser(null);
        tokenSetter('');
    }

    const tokenGetter = () => {
        return localStorage.getItem('authToken');
    }

    const tokenSetter = (token: string) => {
        setToken(token);
        localStorage.setItem('authToken', token);
    }

    const validateField = async (field: string, value: string) => {
        try {
            const data = await api.validateField(field, value);
            return data;
        } catch (error: any) {
            alert(error.response?.data?.message || "Erro desconhecido");
        }
        return false;
    }

    const reviewCreate = async (token: string, streamingId: number, streamingType: string, user: User, title: string, description: string, rate: number) => {
        try {
            const data = await api.reviewCreate(token,streamingId, streamingType, user, title, description, rate);
            return data;
        } catch (error: any) {
            alert(error.response?.data?.message || "Erro desconhecido");
        }
        return null;
    }

    const reviewGet = async (token: string, streamingId: number, streamingType: string) => {
        try {
            const data = await api.reviewGet(token, streamingId, streamingType);
            return data;
        } catch (error: any) {
            alert(error.response?.data?.message || "Erro desconhecido");
        }
        return null;
    }


    return (
        <AuthContext.Provider value={{ user, token, tokenGetter, signin, signup, edit, signout, validateField, reviewCreate, reviewGet }}>
            {children}        
        </AuthContext.Provider>
    )
}