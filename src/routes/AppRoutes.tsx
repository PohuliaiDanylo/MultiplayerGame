import { Routes, Route, Navigate } from "react-router";

import AuthLayout from "../layouts/AuthLayout";

import LoginPage from "../pages/login/login";
import SigninPage from "../pages/signin/signin";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-in" element={<SigninPage />} />
            </Route>
        </Routes>
    );
}
