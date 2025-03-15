import { createContext, useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";

interface User {
    id: string;
    username: string;
}

interface AuthContextType {
    user: User | null;
    login: (user: User, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            fetch("http://localhost:3000/api/user/getData", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data?.id) {
                        setUser({ id: data.id, username: data.username });
                    }
                })
                .catch(() => {
                    Cookies.remove("token");
                    setUser(null);
                });
        }
    }, []);

    const login = (user: User, token: string) => {
        Cookies.set("token", token, { expires: 7 });
        setUser(user);
    };

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth shoud be inside of AuthProvider");
    }
    return context;
};
