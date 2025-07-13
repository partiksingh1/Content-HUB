import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { createContext, ReactNode, RefObject, useCallback, useContext, useEffect, useRef, useState } from "react";

const AuthContext = createContext<{
    signIn: (arg0: string, arg1: string) => void
    signOut: () => void
    token: RefObject<String | null> | null;
    isLoading: boolean
}>({
    signIn: () => null,
    signOut: () => null,
    token: null,
    isLoading: true
});

export function useAuthSession() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: ReactNode }): ReactNode {
    const renderCount = useRef(0);
    renderCount.current++;
    console.log(`Component rendered ${renderCount.current} times`);
    const tokenRef = useRef<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const checkToken = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync("token");
                console.log("Retrieved token:", storedToken);
                tokenRef.current = storedToken;
            } catch (err) {
                console.error("Error retrieving token", err);
            } finally {
                setIsLoading(false);
            }
        };
        checkToken();
    }, []);
    console.log(`reached 1`);
    const signIn = useCallback(async (token: string, userId: string) => {
        try {
            console.log("Signing in with token:", token);
            await SecureStore.setItemAsync('token', token);
            await SecureStore.setItemAsync('userId', userId);
            tokenRef.current = token;
            router.replace("/(app)");
        } catch (err) {
            console.error("Sign-in error", err);
        }
    }, []);
    console.log(`reached 2`);

    const signOut = useCallback(async () => {
        try {
            console.log("Signing out...");
            await SecureStore.deleteItemAsync('token');
            await SecureStore.deleteItemAsync('userId');
            tokenRef.current = null;
            router.replace("/(auth)/Login");
        } catch (err) {
            console.error("Sign-out error", err);
        }
    }, []);
    console.log(`reached 3`);
    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                token: tokenRef,
                isLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
