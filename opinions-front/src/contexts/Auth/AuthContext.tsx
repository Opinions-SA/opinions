import { createContext } from "react";
import { User } from "../../interface/User";
import { Review } from "../../interface/Review";

export interface AuthContextProps {
    user: User | null;
    token: string | null;
    tokenGetter: () => string | null;
    signin: (username: string, password: string) => Promise<boolean>;
    signup: (username: string, email: string, password: string) => Promise<boolean>;
    edit: (username: string, email: string, phone: string) => Promise<boolean>;
    signout: () => void;
    validateField: (field: string, value: string) => Promise<Boolean>;
    reviewCreate: (token: string, streamingId: number, streamingType: string, user: User, title: string, description: string, rate: number) => Promise<Review | null>;
    reviewGet: (token: string, streamingId: number, streamingType: string) => Promise<Review | null>;
}

export const AuthContext = createContext<AuthContextProps>(null!);