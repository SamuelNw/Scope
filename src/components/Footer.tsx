import { Grid } from "@mui/material";

const Footer = () => {
    return (
        <Grid
            sx={{
                height: 60,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
            }}
        >
            Copyright {new Date().getFullYear()} © SamuelNw.
        </Grid>
    );
};

export default Footer;
