import { Grid } from "@mui/material";

const AuthLayout: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    return (
        <Grid
            container
            sx={{
                backgroundColor: "white",
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {children}
        </Grid>
    );
};

export default AuthLayout;
