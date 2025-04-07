import { Routes, Route, Navigate } from "react-router";
import PrivateRoute from "../components/PrivateRoute";

import AuthLayout from "../layouts/AuthLayout";
import LogedMenuLayout from "../layouts/LogedMenuLayout";

import LoginPage from "../pages/Login/Login";
import SigninPage from "../pages/Signin/Signin";
import Menu from "../pages/Menu/Menu";
import CreateRoom from "../pages/CreateRoom/CreateRoom";
import JoinRoom from "../pages/JoinRoom/JoinRoom";
import Game from "../pages/Game/Game";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="auth" element={<AuthLayout />}>
                <Route
                    path="login"
                    element={
                        <PrivateRoute
                            element={<LoginPage />}
                            isPrivate={false}
                            redirect={"/menu"}
                        />
                    }
                />
                <Route
                    path="sign-in"
                    element={
                        <PrivateRoute
                            element={<SigninPage />}
                            isPrivate={false}
                            redirect={"/menu"}
                        />
                    }
                />
            </Route>
            <Route element={<LogedMenuLayout />}>
                <Route
                    path="menu"
                    element={
                        <PrivateRoute
                            element={<Menu />}
                            isPrivate={true}
                            redirect={"/auth/login"}
                        />
                    }
                />
                <Route
                    path="create-room"
                    element={
                        <PrivateRoute
                            element={<CreateRoom />}
                            isPrivate={true}
                            redirect={"/auth/menu"}
                        />
                    }
                />
                <Route
                    path="join-room"
                    element={
                        <PrivateRoute
                            element={<JoinRoom />}
                            isPrivate={true}
                            redirect={"/menu"}
                        />
                    }
                />
                <Route
                    path="game/:id"
                    element={
                        <PrivateRoute
                            element={<Game />}
                            isPrivate={true}
                            redirect={"/menu"}
                        />
                    }
                />
            </Route>
            <Route path="*" element={<Navigate to={"/menu"} />} />
        </Routes>
    );
}
