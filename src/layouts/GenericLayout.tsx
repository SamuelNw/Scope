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
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column !important",
                    overflowY: "scroll",
                    flex: 1,
                    px: {
                        xs: 2,
                        sm: 2,
                        md: 3,
                        lg: 8,
                        xl: 20,
                    },
                    // py: { sm: 6, md: 0 },
                }}
            >
                {children}
            </Grid>

            <Footer />
        </Grid>
    );
};

export default GenericLayout;
