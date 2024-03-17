import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [credential, setCredential] = useState(() => {
        const data = localStorage.getItem('credential');
        if (!data) {
            return;
        }else {
            return JSON.parse(data)
        }
    }, []);

    // SETIAP AKSES PAGE HARUS MEMILIKI TOKEN
    // const getToken = async () => {
    //     try {
    //         const requestToken = await fetch('https://fakestoreapi.com/auth/login', {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             method: 'POST',
    //             body: JSON.stringify({
    //                 username: credential.username,
    //                 password: credential.password
    //             })
    //         })
    //         const result = await requestToken.json();
    //         return true
    //     } catch (error) {
    //         return false
    //     }
    // }

    const checkLogin = () => {
        if (typeof credential != "undefined") {
            return true
        } else {
            return false
        }
    }

    // TANYA MIFTA USEEFFECT

    const value = {
        checkLogin
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}