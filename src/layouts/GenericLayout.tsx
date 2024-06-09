import { Grid } from "@mui/material";
import { Footer, Header } from "../components";

const GenericLayout: React.FC<{ children: React.ReactElement }> = ({
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
                flexDirection: "column",
            }}
        >
            <Header />

            <Grid
                item
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
                    px: {
                        xs: 2,
                        sm: 2,
                        md: 3,
                        lg: 8,
                        xl: 20,
                    },
                }}
            >
                <Grid sx={{ flex: 1 }}>{children}</Grid>
                <Footer />
            </Grid>
        </Grid>
    );
};

export default GenericLayout;
