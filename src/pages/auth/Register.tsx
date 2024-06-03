import { Paper, Box, Typography, TextField, Button } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { auth } from "../../firebase.js";
import { CustomAlert } from "../../components";

interface AlertContentTypes {
    message: string;
    type: "success" | "error" | "";
}

const Register = () => {
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
            await createUserWithEmailAndPassword(auth, email, password);

            // Clear input fields off user input:
            setEmail("");
            setPassword("");

            // Handle Alerts:
            setAlertContent({
                message: "Account has been created successfully.",
                type: "success",
            });

            // Redirect the user to the login page:
            setTimeout(() => {
                navigate("/login");
            }, 2500);
        } catch (error) {
            console.error("Error while trying to create account: ", error);

            // Handle alerts content:
            setAlertContent({
                message: "That email is already in use.",
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
                    Create An Account
                </Typography>

                <small>Sign up, to access our services.</small>
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
                <Typography sx={{ mb: 1 }}>
                    Password <small>(Must be more than 6 chars)</small>{" "}
                </Typography>
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
                CREATE ACCOUNT
            </Button>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
                Already have an account?{"   "}
                <Link
                    to="/login"
                    style={{
                        textDecoration: "underline",
                        marginLeft: "6px",
                        color: "#1a76d1",
                    }}
                >
                    Sign In
                </Link>
            </Box>
        </Paper>
    );
};

export default Register;
