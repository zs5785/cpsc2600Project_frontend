import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({children}){
    const sessionLocID = 'session';

    function getSessionLocData(field){
        const data = localStorage.getItem(sessionLocID);
        if (data){
            return JSON.parse(data)[field];
        }
        else
            return undefined;
    }

    const [user, setUser] = useState(getSessionLocData('username') || "");
    const [token, setToken] = useState(getSessionLocData('token') || "");
    const [role, setRole] = useState(getSessionLocData('role') || "");

    const isAdmin = ()=>{
        return role === 'admin';
    }

    const login = (sessionData)=>{
        if (sessionData){
            setUser(sessionData.username);
            setToken(sessionData.token);
            setRole(sessionData.role);
            localStorage.setItem(sessionLocID, JSON.stringify(sessionData));
        }
        else
            localStorage.removeItem(sessionLocID);
    }

    const logout = ()=>{
        setUser("");
        setToken("");
        setRole("");
        localStorage.removeItem(sessionLocID);
    }


    useEffect(()=>{
        if (token){
            axios.get(`${import.meta.env.VITE_SERVER_URL}/user/${token}`)
                .then((response)=>{
                    console.log(response);
                })
                .catch((err)=>{
                    console.error(err);
                    logout();
                });
        }
    }, []);

    return (
        <AuthContext.Provider value={{user, token, isAdmin, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = ()=>{
    return useContext(AuthContext);
};