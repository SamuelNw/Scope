import React from "react";
import { useLocation, Navigate } from "react-router-dom";

interface AppRouteProps {
    children: React.ReactNode;
}

const AppRoute: React.FC<AppRouteProps> = ({ children }) => {
    const isUserAuthenticated = false;
    const location = useLocation();

    const defaultRedirectPath = "/";
    const unprotectedRoutes = ["/", "/login", "/register"];

    const isUnprotectedRoute = unprotectedRoutes.includes(location.pathname);

    return isUserAuthenticated || isUnprotectedRoute ? (
        children
    ) : (
        <Navigate to={defaultRedirectPath} replace state={{ from: location }} />
    );
};

export default AppRoute;
