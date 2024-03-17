import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [token, setToken] = useState('THIS IS TOKEN FROM CONTEXT');

    const getToken = async (username, password) => {
        try {
            const requestToken = await fetch('https://fakestoreapi.com/auth/login', {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            const result = await requestToken.json();
            return result.token
        } catch (error) {
            return error
        }
    }

    // TANYA MIFTA USEEFFECT

    const value = {
        getToken,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}