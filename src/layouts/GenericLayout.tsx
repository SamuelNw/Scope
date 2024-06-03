import { Grid } from "@mui/material";
import { Footer, Header } from "../components";

const GenericLayout: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    return (
        <Grid
            sx={{ backgroundColor: "white", width: "100vw", height: "100vh" }}
        >
            <Header />

            <Grid sx={{}}>{children}</Grid>

            <Footer />
        </Grid>
    );
};

export default GenericLayout;
