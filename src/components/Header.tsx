import {
    AppBar,
    Box,
    Drawer,
    Toolbar,
    Typography,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";
import HomeActionButtons from "./HomeActionButtons";
import FoundationIcon from "@mui/icons-material/Foundation";

export default function Header() {
    const isSmallScreen = useMediaQuery("(max-width: 850px)");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { email } = useSelector((state: RootState) => state.user);

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ flexGrow: 1, fontWeight: "bold" }}
                >
                    <Link
                        to="/"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        Scope
                    </Link>
                </Typography>

                {!isSmallScreen && (
                    <Box
                        sx={{
                            mr: "80px",
                        }}
                    >
                        <Link
                            to="/home"
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                                height: "40px",
                                borderBottom: "1px solid white",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <FoundationIcon sx={{ mr: 2 }} />
                            Go Back Home
                        </Link>
                    </Box>
                )}

                {isSmallScreen && email !== null ? (
                    <>
                        <MenuIcon
                            sx={{
                                color: "white",
                                cursor: "pointer",
                                width: "28px",
                                height: "80%",
                            }}
                            onClick={handleDrawerOpen}
                        />
                        <Drawer
                            anchor="left"
                            open={isDrawerOpen}
                            onClose={handleDrawerClose}
                        >
                            <Sidebar />
                        </Drawer>
                    </>
                ) : (
                    <HomeActionButtons />
                )}
            </Toolbar>
        </AppBar>
    );
}
