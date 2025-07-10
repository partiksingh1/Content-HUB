import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { createContext, ReactNode, RefObject, useCallback, useContext, useEffect, useRef, useState } from "react";
const AuthContext = createContext<{
    signIn: (arg0: string) => void
    signOut: () => void
    token: RefObject<String | null> | null;
    isLoading: boolean
}>({
    signIn: () => null,
    signOut: () => null,
    token: null,
    isLoading: true
})

export function useAuthSession() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: ReactNode }): ReactNode {
    const tokenRef = useRef<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        (async (): Promise<void> => {
            const token = await AsyncStorage.getItem("@token");
            tokenRef.current = token || '';
            setIsLoading(false);
        })()
    }, []);
    const signIn = useCallback(async (token: string) => {
        await AsyncStorage.setItem("@token", token);
        tokenRef.current = token;
        router.replace("/Login")
    }, [])
    const signOut = useCallback(async () => {
        await AsyncStorage.setItem("@token", "");
        tokenRef.current = null;
        router.replace("/(auth)/Login")
    }, [])
    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                token: tokenRef,
                isLoading
            }}
        >{children}</AuthContext.Provider>
    )
}