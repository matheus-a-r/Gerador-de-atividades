"use client";

import { UserFormState, UserResponseDTO } from "@/types";
import {
    logOut as exit,
    signInRequest,
    signUpRequest,
} from "../api/user";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

type AuthContextType = {
    isAuthenticated: boolean;
    signIn: (data: SignInData) => Promise<any>;
    signUp: (data: UserFormState) => Promise<any>;
    logout: () => Promise<void>;
    user: UserResponseDTO | undefined;
    setUser: (user: UserResponseDTO) => void;
};

export type SignInData = {
    email: string;
    password: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<UserResponseDTO>();
    const isAuthenticated = !!user;
    const router = useRouter();

    async function signIn(credentials: SignInData) {
        const response = await signInRequest(credentials);

        if (response && response.status === 200) {
            setCookie(undefined, "nextauth.accessToken", response.data.accessToken);
            setCookie(undefined, "nextauth.refreshToken", response.data.refreshToken);
            setUser(response.data.user);

            router.push("/form");
        }
        return { data: response?.data, status: response?.status };
    }

    async function signUp(credentials: UserFormState) {
        const response = await signUpRequest(credentials);
        if (response && response.status === 201) {
            setCookie(undefined, "nextauth.accessToken", response.data.accessToken);
            setCookie(undefined, "nextauth.refreshToken", response.data.refreshToken);
            setUser(response.data.userResponse);

            router.push("/form");
        }
        return { data: response?.data, status: response?.status };
    }

    async function logout() {
        await exit();
    }

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, signIn, signUp, logout, setUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}
