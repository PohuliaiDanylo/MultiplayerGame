import { createContext, useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";

interface User {
    id: string;
    username: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const updateUserContext = () => {
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
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        updateUserContext();
    }, []);

    const login = (user: User, token: string) => {
        Cookies.set("token", token, { expires: 7 });
        updateUserContext();
        setUser(user);
    };

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
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
