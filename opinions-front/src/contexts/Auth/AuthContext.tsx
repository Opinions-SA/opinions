import { createContext } from "react";
import { User } from "../../interface/User";

export interface AuthContextProps {
    user: User | null;
    token: string | null;
    signin: (username: string, password: string) => Promise<boolean>;
    signup: (username: string, email: string, password: string) => Promise<boolean>;
    signout: () => void;
    validateField: (field: string, value: string) => Promise<Boolean>;
}

export const AuthContext = createContext<AuthContextProps>(null!);