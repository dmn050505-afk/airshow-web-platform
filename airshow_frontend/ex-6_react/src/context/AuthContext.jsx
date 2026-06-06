import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const URL_USER = 'http://127.0.0.1:8000/api/me/';
const URL_LOGIN = 'http://127.0.0.1:8000/api/login/';
const URL_LOGOUT = 'http://127.0.0.1:8000/api/logout/';

export const useUserContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(URL_USER, { withCredentials: true })
            .then(response => setUser(response.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = (username, password) => {
        return axios.post(URL_LOGIN, { username, password }, { withCredentials: true })
            .then(response => {
                setUser(response.data);
            });
    };

    const logout = () => {
        return axios.get(URL_LOGOUT, { withCredentials: true })
            .then(() => setUser(null));
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;