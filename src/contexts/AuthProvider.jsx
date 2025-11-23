import { useContext, createContext, useState } from "react";

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