import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, Tabs } from 'expo-router';
import { useEffect } from 'react';
import { useAuthSession } from '../services/AuthProvider';

export default function TabLayout() {
    const { token, isLoading } = useAuthSession();
    useEffect(() => {
        if (!isLoading && !token?.current) {
            router.replace("/(auth)/Login");
        }
    }, [isLoading]);
    if (token == null) {
        return router.replace("/(auth)/Login")
    }
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />
        </Tabs>
    );
}
