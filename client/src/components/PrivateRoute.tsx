import { Navigate } from "react-router";
import React from "react";

import { useAuth } from "../context/AuthContext";

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
    const { user } = useAuth();
    return !user === !isPrivate ? element : <Navigate to={redirect} />;
};

export default PrivateRoute;
