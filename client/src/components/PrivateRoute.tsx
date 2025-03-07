import { Navigate } from "react-router";

import { getAuthToken } from "../utils/auth";
import React from "react";

interface PrivateRouteInterface {
    element: React.ReactElement;
    tokenBool: boolean;
    to: string;
}

const PrivateRoute: React.FC<PrivateRouteInterface> = ({
    element,
    tokenBool,
    to,
}) => {
    const token = getAuthToken();
    return !token === !tokenBool ? element : <Navigate to={to} />;
};

export default PrivateRoute;
