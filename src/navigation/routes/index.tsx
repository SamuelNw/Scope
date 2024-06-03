import { LandingPage } from "../../pages/main";
import { Login, Register } from "../../pages/auth";

export const privateRoutes = [];

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
