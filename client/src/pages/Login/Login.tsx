import { useNavigate } from "react-router";

import { saveAuthData } from "../../utils/auth";

import AuthForm from "../../components/AuthForm";

export default function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = (data: Record<string, string>) => {
        fetch("http://localhost:3000/api/auth/login", {
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
                saveAuthData(data.token, data.user);
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
