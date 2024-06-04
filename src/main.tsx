import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import store, { persistor } from "./context/store.tsx";
import { PersistGate } from "redux-persist/integration/react";

const theme = createTheme({
    typography: {
        fontFamily: "'IBM Plex Sans', sans-serif",
        button: {
            textTransform: "none",
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <Router>
                        <App />
                    </Router>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
