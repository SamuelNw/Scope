import { AppBar, Button, Toolbar, Typography } from "@mui/material";

export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ flexGrow: 1, fontWeight: "bold" }}
                >
                    Scope
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}
