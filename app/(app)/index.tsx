import Card from '@/components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Blog } from '../types/Blog';

export default function Tab() {
    const [blogs, setBlogs] = useState<Blog[]>()
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    console.log("token", token);
    console.log("userId", userId);
    useEffect(() => {
        const fetchTokenAndUserId = async () => {
            try {
                const fetchedToken = await AsyncStorage.getItem("@token");
                const fetchedUserId = await AsyncStorage.getItem("@userId");

                console.log("token", fetchedToken);
                console.log("userId", fetchedUserId);

                // Set the state with the fetched values
                setToken(fetchedToken);
                setUserId(fetchedUserId);

                // Optionally, fetch blogs after getting the token and userId
                if (fetchedToken && fetchedUserId) {
                    // Example: fetch blogs using token/userId
                    // setBlogs(await fetchBlogs(fetchedToken, fetchedUserId)); 
                }
            } catch (error) {
                console.error("Error fetching from AsyncStorage:", error);
            }
        };

        fetchTokenAndUserId();
    }, []);

    useEffect(() => {
        const response = async () => {
            await fetch(`${process.env.EXPO_PUBLIC_API_URL}/blogs`)
        }
    }, [])
    const handleDelete = () => {
        Alert.alert("Deleted", "Item has been deleted.");
    };

    return (
        <SafeAreaProvider style={styles.container}>
            <Text>Tab [Home|Settings]</Text>
            <Card
                id={1}
                title="Sample Article"
                url="https://www.example.com"
                tags={['Technology', 'React', 'JavaScript']}
                onDelete={handleDelete}
                isRead={false}
            />
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
});
