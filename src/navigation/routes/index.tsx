import { Home, LandingPage, User } from "../../pages/main";
import { Login, Register } from "../../pages/auth";

export const privateRoutes = [
    // Pages accessible only to Authorized users:
    { path: "/home", component: Home },
    { path: "/user/:userId", component: User },
];

export const publicRoutes = [
    // Pages accessible by unauthorized users:
    {
        path: "/",
        component: LandingPage,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/register",
        component: Register,
    },
];
