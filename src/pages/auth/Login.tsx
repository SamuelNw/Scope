import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomAlert from "../../components/Alert.js";
import { useDispatch } from "react-redux";
import { loginUser } from "../../context/user/userActions.js";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

    // State Management
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    // Handling show password functionality:
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
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
                message: "Please enter a valid email address.",
                type: "error",
            });
            setTimeout(() => {
                setAlertContent({
                    message: "",
                    type: "",
                });
            }, 2000);
            return;
        }

        try {
            const response = await dispatch(
                // @ts-ignore
                loginUser({ email, password })
            );

            if (!response.error) {
                setIsLoading(false);

                // Clear input fields off user input:
                setEmail("");
                setPassword("");

                // Handle Alerts:
                setAlertContent({
                    message: "Login operation is a success!",
                    type: "success",
                });

                // Redirect the user to the home page:
                setTimeout(() => {
                    navigate("/home");
                }, 2100);
            } else {
                setAlertContent({
                    message: "Invalid Credentials.",
                    type: "error",
                });
            }
        } catch (error) {
            setIsLoading(false);

            // Handle errors
            setAlertContent({
                message: "Invalid Credentials.",
                type: "error",
            });
        } finally {
            setIsLoading(false);
            // Clear alert after 2.8 seconds
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
                    autoFocus={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ width: "100%" }}
                />
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography sx={{ mb: 1 }}>Enter your Password</Typography>
                <TextField
                    label="Password"
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
                        Logging in...
                    </Typography>
                ) : (
                    <Typography sx={{ color: "white", fontSize: 16 }}>
                        LOG IN
                    </Typography>
                )}
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
