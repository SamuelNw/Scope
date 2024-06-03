import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// @ts-ignore
import { auth } from "../../firebase.js";
import CustomAlert from "../../components/Alert.js";

interface AlertContentTypes {
    message: string;
    type: "success" | "error" | "";
}

const Login = () => {
    // Component states go here:
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertContent, setAlertContent] = useState<AlertContentTypes>({
        message: "",
        type: "",
    });

    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);

            // Clear input fields off user input:
            setEmail("");
            setPassword("");

            // Handle Alerts:
            setAlertContent({
                message: "Login operation is a success!",
                type: "success",
            });

            // Redirect the user to the login page:
            setTimeout(() => {
                navigate("/home");
            }, 2500);
        } catch (error) {
            console.error("Error while trying to sign in: ", error);

            // Handle alerts content:
            setAlertContent({
                message: "Invalid Credentials.",
                type: "error",
            });
        } finally {
            setTimeout(() => {
                setAlertContent({
                    message: "",
                    type: "",
                });
            }, 2000);
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                px: 3,
                py: 4,
                display: "flex",
                flexDirection: "column",
                minWidth: {
                    xs: "80vw",
                    sm: "50vw",
                    md: "40vw",
                    lg: "25vw",
                },
            }}
        >
            <Typography
                variant="h5"
                component="div"
                sx={{
                    flexGrow: 1,
                    fontWeight: "bold",
                    textAlign: "center",
                    mb: 2,
                }}
            >
                <Link
                    to="/"
                    style={{ textDecoration: "none", color: "#1a76d1" }}
                >
                    Scope
                </Link>
            </Typography>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                    Sign In
                </Typography>

                <small>Log in to your account, to access our services.</small>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography sx={{ mb: 1 }}>Enter your Email</Typography>
                <TextField
                    label="Email"
                    type="email"
                    size="small"
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ width: "100%" }}
                />
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography sx={{ mb: 1 }}>Enter your Password</Typography>
                <TextField
                    label="Password"
                    type="password"
                    size="small"
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ width: "100%" }}
                />
            </Box>

            {alertContent.message && (
                <CustomAlert
                    message={alertContent.message}
                    type={alertContent.type}
                />
            )}

            <Button
                variant="contained"
                type="submit"
                disabled={!email || password.length <= 6}
                onClick={handleSubmit}
                sx={{
                    backgroundColor: "#454955",
                    color: "white",
                    outline: "none !important",
                    border: "none",
                    py: 1,
                    mb: 3,
                    "&:hover": {
                        backgroundColor: "#3d444b",
                        outline: "none !important",
                        border: "none",
                    },
                    "&.MuiButton-active": {
                        backgroundColor: "#514e5a",
                        outline: "none !important",
                        border: "none",
                    },
                }}
            >
                LOG IN
            </Button>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
                Don't have an account?{" "}
                <Link
                    to="/register"
                    style={{
                        textDecoration: "underline",
                        marginLeft: "6px",
                        color: "#1a76d1",
                    }}
                >
                    Create Account
                </Link>
            </Box>
        </Paper>
    );
};

export default Login;
