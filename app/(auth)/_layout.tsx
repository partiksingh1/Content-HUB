
import { Stack } from 'expo-router';
import { ReactNode } from "react";
import { Text } from 'react-native';
import { useAuthSession } from '../services/AuthProvider';

export default function RootLayout(): ReactNode {
    console.log("auth layout called");

    const { token, isLoading } = useAuthSession();
    if (isLoading) {
        return <Text>Loading</Text>;
    }
    console.log("token", token?.current);
    if (token?.current) {
        console.log("token present");

    }
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' />
            <Stack.Screen name='Signup' />
            <Stack.Screen name="(app)" />
        </Stack>
    )
}