import {
    Avatar,
    Box,
    Button,
    CssBaseline,
    Grid,
    Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../context/user/userActions.js";
import { RootState } from "../context/store.js";
import { useSelector } from "react-redux";

const Sidebar = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { email } = useSelector((state: RootState) => state.user);

    const handleSignout = async () => {
        try {
            // @ts-ignore
            await dispatch(logoutUser());

            // redirect user to landing page:
            navigate("/");
        } catch (e) {
            console.error("Error while trying to logout: ", e);
        }
    };

    return (
        <Grid
            sx={{
                width: {
                    xs: "270px",
                    md: "100%",
                },
                height: "100vh",
                py: {
                    xs: 1,
                    md: 10,
                },
                backgroundColor: "white",
                borderRight: {
                    sm: "none",
                    md: "1px dashed grey",
                },
            }}
        >
            <CssBaseline />

            <Box
                sx={{
                    display: {
                        xs: "flex",
                        md: "none",
                    },
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "space-between",
                    my: 2,
                    mx: 3,
                }}
            >
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontWeight: "bold",
                        color: "#1a76d1",
                    }}
                >
                    <Link
                        to="/"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        Scope
                    </Link>
                </Typography>

                <span
                    style={{
                        color: "#919EAB",
                        marginTop: "30px",
                        fontWeight: 700,
                        fontSize: "12px",
                    }}
                >
                    OVERVIEW
                </span>

                <Box sx={{ mb: 5 }}>{/* Where the sidebar items go: */}</Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        alt="Profile Image"
                        src={""}
                        sx={{
                            cursor: "pointer",
                            height: "62px",
                            width: "62px",
                            mb: 1,
                        }}
                    />
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: "14px",
                            color: "black",
                        }}
                    >
                        Active Session
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 400,
                            fontSize: "13px",
                            color: "#919EAB",
                            mb: 2,
                        }}
                    >
                        {email}
                    </Typography>
                    <Button
                        variant="contained"
                        type="button"
                        onClick={handleSignout}
                        sx={{
                            backgroundColor: "#454955",
                            color: "white",
                            outline: "none !important",
                            border: "none",
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
                        Sign Out
                    </Button>
                </Box>
            </Box>
        </Grid>
    );
};

export default Sidebar;
