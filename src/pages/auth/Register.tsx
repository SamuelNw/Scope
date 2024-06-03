import { Paper, Box, Typography, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <Paper
            elevation={3}
            sx={{
                px: 3,
                py: 4,
                display: "flex",
                flexDirection: "column",
                minWidth: "30vw",
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
                    sx={{ width: "100%" }}
                />
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography sx={{ mb: 1 }}>Enter your Password</Typography>
                <TextField
                    label="Password"
                    type="password"
                    size="small"
                    sx={{ width: "100%" }}
                />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
                Already have an account?{"   "}
                <Link
                    to="/login"
                    style={{ textDecoration: "underline", marginLeft: "6px" }}
                >
                    Sign In
                </Link>
            </Box>
        </Paper>
    );
};

export default Register;
