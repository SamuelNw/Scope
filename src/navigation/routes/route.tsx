import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { RootState } from "../../context/store";

interface AppRouteProps {
    children: React.ReactNode;
}

const AppRoute: React.FC<AppRouteProps> = ({ children }) => {
    const loggedIn = useSelector((state: RootState) => state.user.email);
    const location = useLocation();

    const loginPage = "/login";
    const unprotectedRoutes = ["/", "/login", "/register"];
    const isUnprotectedRoute = unprotectedRoutes.includes(location.pathname);

    // If a user is already logged in and is trying to access the public routes, redirect them to the home page:
    if (loggedIn && isUnprotectedRoute) {
        return <Navigate to={"/home"} replace />;
    }

    // If a user is not logged in and is trying to access a private route, redirect them to the login page:
    // Also, store the page they intended to go to so as to redirect them there after logging in:
    if (!loggedIn && !isUnprotectedRoute) {
        return <Navigate to={loginPage} replace state={{ from: location }} />;
    }

    // If the above conditions are not met, just redirect the user to said page:
    return <>{children}</>;
};

export default AppRoute;
