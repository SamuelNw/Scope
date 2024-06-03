import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";

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
        <ThemeProvider theme={theme}>
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    </React.StrictMode>
);
