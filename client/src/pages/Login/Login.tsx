import { useNavigate } from "react-router";

import { saveAuthData } from "../../utils/auth";

import AuthForm from "../../components/AuthForm";

export default function LoginPage() {
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
                saveAuthData(data.token);
                navigate("/menu");
            })
            .catch((err) => {
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
                navigate("/sign-in");
            }}
            onSubmit={handleLogin}
            type="login"
        />
    );
}
