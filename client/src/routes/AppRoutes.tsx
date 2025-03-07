import { Routes, Route, Navigate } from "react-router";
import PrivateRoute from "../components/PrivateRoute";

import AuthLayout from "../layouts/AuthLayout";

import LoginPage from "../pages/Login/Login";
import SigninPage from "../pages/Signin/Signin";
import Menu from "../pages/Menu/Menu";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route element={<AuthLayout />}>
                <Route
                    path="/login"
                    element={
                        <PrivateRoute
                            element={<LoginPage />}
                            tokenBool={false}
                            to={"/menu"}
                        />
                    }
                />
                <Route
                    path="/sign-in"
                    element={
                        <PrivateRoute
                            element={<SigninPage />}
                            tokenBool={false}
                            to={"/menu"}
                        />
                    }
                />
            </Route>
            <Route
                path="/menu"
                element={
                    <PrivateRoute
                        element={<Menu />}
                        tokenBool={true}
                        to={"/login"}
                    />
                }
            />
            <Route path="*" element={<Navigate to={"/menu"} />} />
        </Routes>
    );
}
