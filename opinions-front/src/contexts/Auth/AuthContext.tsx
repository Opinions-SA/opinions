import { createContext } from "react";
import { User } from "../../interface/User";

export interface AuthContextProps {
    user: User | null;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => void;
}

export const AuthContext = createContext<AuthContextProps>(null!);