import { Route, Routes } from "react-router-dom";
import { AuthLayout, GenericLayout } from "./layouts";
import { LandingPage } from "./pages/main";
import { publicRoutes } from "./navigation/routes";
import AppRoute from "./navigation/routes/route";

function App() {
    return (
        <Routes>
            {/* Default landing page route: */}
            <Route
                path="/"
                element={
                    <GenericLayout>
                        <LandingPage />
                    </GenericLayout>
                }
            />

            {/* Routes accessible to unauthorized users: */}
            {publicRoutes.map((route) => (
                <Route
                    key={route.path}
                    element={
                        <AppRoute>
                            <AuthLayout>
                                <route.component />
                            </AuthLayout>
                        </AppRoute>
                    }
                />
            ))}

            {/* Routes accessible only to Authorized users: */}
            {publicRoutes.map((route) => (
                <Route
                    key={route.path}
                    element={
                        <AppRoute>
                            <GenericLayout>
                                <route.component />
                            </GenericLayout>
                        </AppRoute>
                    }
                />
            ))}
        </Routes>
    );
}

export default App;
