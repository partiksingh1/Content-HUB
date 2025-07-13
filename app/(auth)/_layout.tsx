
import { router, Stack } from 'expo-router';
import { ReactNode, useEffect } from "react";
import { useAuthSession } from '../services/AuthProvider';

export default function RootLayout(): ReactNode {
    console.log("auth layout called");

    const { token, isLoading } = useAuthSession();
    useEffect(() => {
        if (!isLoading && token?.current) {
            router.replace("/(app)");
        }
    }, [isLoading]);
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' />
            <Stack.Screen name='Signup' />
            <Stack.Screen name="(app)" />
        </Stack>
    )
}