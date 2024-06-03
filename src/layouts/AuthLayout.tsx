import { Grid } from "@mui/material";

const AuthLayout: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    return (
        <Grid
            item
            xs={12}
            sm={12}
            md={5}
            sx={{
                backgroundColor: "#f3eff5",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: {
                    xs: 0,
                    sm: 8,
                    md: 2,
                    lg: 6,
                },
            }}
        >
            {children}
        </Grid>
    );
};

export default AuthLayout;
