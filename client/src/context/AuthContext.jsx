import React, { createContext, useState, useEffect } from "react";
import { signUp, logIn } from "@/services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if the user is logged in on initial load
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = JSON.parse(localStorage.getItem("user")); // Retrieve user data if stored
            setUser(user);
        }
        setLoading(false);
    }, []);

    const signUpUser = async (formData) => {
        try {
            const { data } = await signUp(formData);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.result)); // Store user data in localStorage
            setUser(data.result);
        } catch (error) {
            console.error("Signup error", error);
        }
    };

    const logInUser = async (formData) => {
        try {
            const { data } = await logIn(formData);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.result)); // Store user data in localStorage
            setUser(data.result);
        } catch (error) {
            console.error("Login error", error);
        }
    };

    const logOutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signUpUser, logInUser, logOutUser }}>
            {children}
        </AuthContext.Provider>
    );
};
