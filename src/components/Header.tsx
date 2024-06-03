import {
    AppBar,
    Button,
    Drawer,
    Toolbar,
    Typography,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Header() {
    const isSmallScreen = useMediaQuery("(max-width: 850px)");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

                {isSmallScreen ? (
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
                    <Button
                        sx={{
                            color: "inherit",
                            border: "1px solid white",
                            outline: "none !important",
                        }}
                    >
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}
