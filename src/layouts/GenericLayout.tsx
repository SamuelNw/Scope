import { Grid } from "@mui/material";
import { Footer, Header } from "../components";

const GenericLayout: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    return (
        <Grid
            sx={{
                backgroundColor: "white",
                width: "100vw",
                minHeight: "100vh",
            }}
        >
            <Header />

            <Grid
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    minHeight: "86vh",
                }}
            >
                {children}
            </Grid>

            <Footer />
        </Grid>
    );
};

export default GenericLayout;
