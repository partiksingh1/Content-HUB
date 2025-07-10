import { Link } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Button,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { useAuthSession } from "../services/AuthProvider";


export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuthSession();
    const onLoginPress = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                throw new Error(data.message || "Login failed.");
            }
            if (data.token) {
                Alert.alert("Login Successfull")
                signIn(data.token);
            } else {
                Alert.alert("Login failed", "No token received.");
            }
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
                        <Text style={AuthStyles.logoText}>Login</Text>
                        <TextInput
                            placeholder="Email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={setEmail}
                            value={email}
                            style={AuthStyles.loginFormTextInput}
                        />
                        <TextInput
                            placeholder="Password"
                            onChangeText={setPassword}
                            value={password}
                            style={AuthStyles.loginFormTextInput}
                            secureTextEntry={true}
                        />
                        <Button
                            color='black'
                            onPress={() => onLoginPress()}
                            title={loading ? "Logging in..." : "Login"}
                            disabled={loading}

                        />
                        <Link style={AuthStyles.link} href={"/(auth)/Signup"} replace>Create an account?</Link>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export const AuthStyles = StyleSheet.create({
    containerView: {
        flex: 1,
        alignItems: "center"
    },
    loginScreenContainer: {
        flex: 1,
        width: 300,
    },
    logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: "center",
    },
    loginFormView: {
        flex: 1,
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#eaeaea",
        backgroundColor: "#fafafa",
        paddingLeft: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    link: {
        marginTop: 10,
        color: 'blue',
        textAlign: 'center'
    }
});