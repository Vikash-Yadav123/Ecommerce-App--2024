import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();


const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        user: '',
        token: null,
    });

    // token set
    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        let lsData = localStorage.getItem('auth3');
        if (lsData) {
            let ls = JSON.parse(lsData);
            setAuth({
                ...auth,
                user: ls.user,
                token: ls.token,
            });
        }
    }, [])
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

//CUSTOM HOOKS
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
