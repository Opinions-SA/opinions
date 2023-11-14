import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { User } from "../../interface/User";
import { AuthResponse } from "../../interface/AuthResponse";
import { useApi } from "../../hooks/useApi";

export const AuthProvider = ({ children }: { children: JSX.Element}) => {
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
            }
        }
        validadeToken();
    }, []);

    const signin = async (email: string, password: string) => {
        try {
            const data = await api.signin(email, password);
            if (data.user && data.token) {
                setUser(data.user);
                setToken(data.token);
                return true;
            } 
        } catch (error: any) {
            alert(error.response?.data?.message || "Erro desconhecido");
        }
        return false;
    }

    const signout = async () => {
        const storageData = localStorage.getItem('authToken');
        await api.logout(storageData ? storageData : "");
        setUser(null);
        setToken('');
    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token);
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}        
        </AuthContext.Provider>
    )
}