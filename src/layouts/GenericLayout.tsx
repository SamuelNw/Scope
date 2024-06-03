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
                sx={{
                    flex: 1,
                }}
            >
                {children}
            </Grid>

            <Footer />
        </Grid>
    );
};

export default GenericLayout;
