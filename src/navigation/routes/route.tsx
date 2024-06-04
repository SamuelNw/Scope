import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { RootState } from "../../context/store";

interface AppRouteProps {
    children: React.ReactNode;
}

const AppRoute: React.FC<AppRouteProps> = ({ children }) => {
    const loggedIn = useSelector((state: RootState) => state.user.email);
    const isUserAuthenticated = loggedIn !== null;

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
