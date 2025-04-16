import { useNavigate } from "react-router";

import { useAuth } from "../../context/AuthContext";
import AuthForm from "../../components/AuthForm";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (data: Record<string, string>) => {
        const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
        fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: data.username,
                password: data.password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message) {
                    alert(data.message);
                    return;
                }
                login({ id: data.id, username: data.username }, data.token);
            })
            .catch(() => {
                alert("Error, try later");
            });
    };

    return (
        <AuthForm
            title="Login"
            buttonText="Sign in"
            fields={[
                { name: "username", type: "text", placeholder: "username" },
                { name: "password", type: "password", placeholder: "password" },
            ]}
            onButtonClick={() => {
                navigate("/auth/sign-in");
            }}
            onSubmit={handleLogin}
            type="login"
        />
    );
}
