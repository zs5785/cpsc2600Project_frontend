import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({children}){
    const userLocID = 'username';
    const tokenLocID = 'token';

    const [user, setUser] = useState(localStorage.getItem(userLocID) || "");
    const [token, setToken] = useState(localStorage.getItem(tokenLocID) || "");
    const updateUser = (newUser)=>{
        setUser(newUser);
        if (newUser)
            localStorage.setItem(userLocID, newUser);
        else
            localStorage.removeItem(userLocID);
    };
    const updateToken = (newToken)=>{
        setToken(newToken);
        if (newToken)
            localStorage.setItem(tokenLocID, newToken);
        else
            localStorage.removeItem(tokenLocID);
    };

    useEffect(()=>{
        if (token){
            axios.get(`${import.meta.env.VITE_SERVER_URL}/user/${token}`)
                .then((response)=>{
                    console.log(response);
                })
                .catch((err)=>{
                    console.error(err);
                    updateUser("");
                    updateToken("");
                });
        }
    }, [])

    return (
        <AuthContext.Provider value={{user, token, updateUser, updateToken}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = ()=>{
    return useContext(AuthContext);
};