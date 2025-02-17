import { useNavigate } from "react-router";

import AuthForm from "../../components/AuthForm";

export default function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = (data: Record<string, string>) => {
        console.log(data);
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
        />
    );
}
