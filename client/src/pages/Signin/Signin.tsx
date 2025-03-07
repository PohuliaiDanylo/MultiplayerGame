import { useNavigate } from "react-router";

import { saveAuthData } from "../../utils/auth";

import AuthForm from "../../components/AuthForm";

export default function SigninPage() {
    const navigate = useNavigate();

    const handleSignin = (data: Record<string, string>) => {
        fetch("http://localhost:3000/api/auth/register", {
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
        <>
            <AuthForm
                title="Sign in"
                buttonText="Login"
                fields={[
                    { name: "username", type: "text", placeholder: "username" },
                    {
                        name: "password",
                        type: "password",
                        placeholder: "password",
                    },
                    {
                        name: "confirmPassword",
                        type: "password",
                        placeholder: "confirm password",
                    },
                ]}
                onButtonClick={() => {
                    navigate("/login");
                }}
                onSubmit={handleSignin}
                type="signin"
            />
            <p></p>
        </>
    );
}
