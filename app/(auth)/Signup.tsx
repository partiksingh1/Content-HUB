import { Link, router } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Alert,
    Button,
    Keyboard,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { AuthStyles } from "./Login";


export default function SignupScreen() {
    const renderCount = useRef(0);
    renderCount.current++;
    console.log(`Component rendered ${renderCount.current} times`);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const onSignupPress = async () => {
        if (!email || !password || !confirmPassword || !username) {
            Alert.alert("Error", "Please fill all the fields.");
            return;
        }
        if (password.toString() != confirmPassword.toString()) {
            Alert.alert("Error", "Ensure password are same.");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                throw new Error(data.message || "Signup failed.");
            }
            Alert.alert("Signup Successfull")
            router.replace('/(auth)/Login');
        } catch (error) {
            Alert.alert("Login Error", (error as Error).message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <KeyboardAvoidingView style={AuthStyles.containerView} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={AuthStyles.loginScreenContainer}>
                    <View style={AuthStyles.loginFormView}>
                        <Text style={AuthStyles.logoText}>Signup</Text>
                        <TextInput
                            placeholder="Email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={setEmail}
                            value={email}
                            style={AuthStyles.loginFormTextInput}
                        />
                        <TextInput
                            placeholder="Username"
                            onChangeText={setUsername}
                            value={username}
                            style={AuthStyles.loginFormTextInput}
                        />
                        <TextInput
                            placeholder="Password"
                            onChangeText={setPassword}
                            value={password}
                            style={AuthStyles.loginFormTextInput}
                            secureTextEntry={true}
                        />
                        <TextInput
                            placeholder="Confirm Password"
                            style={AuthStyles.loginFormTextInput}
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            secureTextEntry={true}
                        />
                        <Button
                            color='black'
                            onPress={onSignupPress}
                            title={loading ? "Signing up..." : "Signup"}
                            disabled={loading}
                        />
                        <Link
                            style={AuthStyles.link}
                            href={"/(auth)/Login"}
                            replace
                        >Already have an account?</Link>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}