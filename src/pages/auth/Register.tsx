import {
    Paper,
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { auth } from "../../firebase.js";
import { CustomAlert } from "../../components";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // Handling show and hide password:
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: any) => {
        event?.preventDefault();
    };

    // Function to validate email format
    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        setIsLoading(true);

        // Validate email format
        if (!validateEmail(email)) {
            setAlertContent({
                message: "The email address is invalid.",
                type: "error",
            });
            setTimeout(() => {
                setAlertContent({
                    message: "",
                    type: "",
                });
            }, 2500);

            setIsLoading(false);
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);

            setIsLoading(false);

            // Clear input fields
            setEmail("");
            setPassword("");

            // Show success message
            setAlertContent({
                message: "Account has been created successfully.",
                type: "success",
            });

            // Redirect to login page after 3 seconds
            setTimeout(() => {
                navigate("/login");
            }, 2600);
        } catch (error) {
            setIsLoading(false);
            // Handle Firebase specific errors
            // @ts-ignore
            if (error.code === "auth/email-already-in-use") {
                setAlertContent({
                    message: "That email address is already in use.",
                    type: "error",
                });
            } else {
                // Handle other errors
                setAlertContent({
                    message: "An error occurred. Please try again later.",
                    type: "error",
                });
            }
        } finally {
            setIsLoading(false);
            // Clear alert after 2.8 seconds
            setTimeout(() => {
                setAlertContent({
                    message: "",
                    type: "",
                });
            }, 2500);
        }
    };

    return (
        <Paper
            elevation={3}
            component="form"
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

                <small>Sign up to access our services.</small>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography sx={{ mb: 1 }}>Enter your Email</Typography>
                <TextField
                    label="Email"
                    type="email"
                    size="small"
                    autoFocus={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ width: "100%" }}
                />
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography sx={{ mb: 1 }}>
                    Password <small>(Must be more than 6 chars)</small>{" "}
                </Typography>
                <TextField
                    label="Password-box"
                    type={showPassword ? "text" : "password"}
                    size="small"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ width: "100%" }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    sx={{
                                        border: "none",
                                        outline: "none",
                                        padding: 0,
                                        margin: 0,
                                        color: "primary",
                                        "&:hover": {
                                            backgroundColor: "transparent",
                                        },
                                    }}
                                    aria-label={
                                        showPassword
                                            ? "hide password"
                                            : "show password"
                                    }
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
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
                disabled={!email || password.length <= 6 || isLoading}
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
                    "&.Mui-disabled": {
                        backgroundColor: "#9a9a9a",
                        color: "#c0c0c0",
                    },
                }}
            >
                {isLoading ? (
                    <Typography sx={{ color: "white", fontSize: 16 }}>
                        Creating...
                    </Typography>
                ) : (
                    <Typography sx={{ color: "white", fontSize: 16 }}>
                        CREATE ACCOUNT
                    </Typography>
                )}
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
