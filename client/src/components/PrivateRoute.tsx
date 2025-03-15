import { Navigate } from "react-router";
import React from "react";

import { useAuth } from "../context/AuthContext";

import Loading from "../pages/Loading/Loading";

interface PrivateRouteInterface {
    element: React.ReactElement;
    isPrivate: boolean;
    redirect: string;
}

const PrivateRoute: React.FC<PrivateRouteInterface> = ({
    element,
    isPrivate,
    redirect,
}) => {
    const { user, loading } = useAuth();
    if (loading)
        return (
            <div>
                <Loading />
            </div>
        );
    return !user === !isPrivate ? element : <Navigate to={redirect} />;
};

export default PrivateRoute;
