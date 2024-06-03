import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
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
                    lg: "30vw",
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
                    sx={{ width: "100%" }}
                />
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography sx={{ mb: 1 }}>Enter your Password</Typography>
                <TextField
                    label="Password"
                    type="password"
                    size="small"
                    sx={{ width: "100%" }}
                />
            </Box>

            <Button
                variant="contained"
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
