import { useNavigate } from "react-router";

import AuthForm from "../../components/AuthForm";

export default function SigninPage() {
    const navigate = useNavigate();

    const handleLogin = (data: Record<string, string>) => {
        console.log(data);
    };

    return (
        <AuthForm
            title="Sign in"
            buttonText="Login"
            fields={[
                { name: "username", type: "text", placeholder: "username" },
                { name: "password", type: "password", placeholder: "password" },
                {
                    name: "confirmPassword",
                    type: "password",
                    placeholder: "confirm password",
                },
            ]}
            onButtonClick={() => {
                navigate("/login");
            }}
            onSubmit={handleLogin}
            type="signin"
        />
    );
}
