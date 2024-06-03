import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { BlurhashComponent } from "../../components";
import { useState } from "react";
import people from "../../assets/landing.jpg";

const LandingPage = () => {
    const isSmallScreen = useMediaQuery("(max-width: 420px)");

    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Grid
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: {
                    xs: "column",
                    sm: "row",
                },
                justifyContent: "center",
                alignItems: "center",
                overflowY: "scroll",
                py: 2,
            }}
        >
            <Grid
                item
                xs={12}
                sm={5}
                md={7}
                sx={{
                    maxHeight: {
                        xs: "30vh",
                        sm: "100%",
                    },
                    minWidth: {
                        xs: "100%",
                        sm: "0",
                    },
                }}
            >
                <Box
                    sx={{
                        height: {
                            xs: "30vh",
                            sm: "45vh",
                            md: "50vh",
                        },
                        minWidth: "100%",
                        overflow: "hidden",
                        borderTopRightRadius: "30px",
                        borderBottomLeftRadius: "30px",
                        position: "relative",
                        "& > img": {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        },
                    }}
                >
                    <BlurhashComponent
                        hash="L~K0yZWVIUj[~Ua}ROfQt7oen$f6"
                        toDisplay={isLoaded}
                    />
                    <img
                        src={people}
                        alt="Landing page hero image"
                        onLoad={() => setIsLoaded(true)}
                        style={{
                            display: !isLoaded ? "none" : "inline",
                        }}
                    />
                </Box>
            </Grid>

            <Grid
                item
                xs={12}
                sm={7}
                md={5}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    px: {
                        xs: 0,
                        sm: 2,
                    },
                    py: {
                        xs: 4,
                        sm: 0,
                    },
                }}
            >
                <Grid>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "black",
                        }}
                    >
                        What you are signing up for...
                    </Typography>
                    <hr
                        style={{
                            height: "0.5px",
                            backgroundColor: "lightGray",
                            border: "none",
                        }}
                    />
                    <Typography
                        sx={{
                            // textAlign: isSmallScreen ? "center" : "justify",
                            textAlign: "justify",
                            mt: 2,
                            mb: 3,
                            color: "black",
                        }}
                    >
                        {" "}
                        Prepare to be dazzled! Dive into a visually stunning
                        gallery of users, albums, and photos. We're using the
                        JSON Placeholder API to curate a collection that
                        whispers stories through captivating images. Every
                        scroll promises a new discovery, a glimpse into the
                        lives and passions of others. Sign up and get ready to
                        be surprised by the beauty of the human experience, all
                        presented in a user-friendly format.
                    </Typography>{" "}
                    <hr
                        style={{
                            height: "0.5px",
                            backgroundColor: "lightGray",
                            border: "none",
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 4,
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#454955",
                                color: "white",
                                outline: "none !important",
                                border: "none",
                                width: 200,
                                height: 50,
                                "&:hover": {
                                    backgroundColor: "#3d444b",
                                    outline: "none !important",
                                    border: "none",
                                },
                                "&.MuiButton-active": {
                                    backgroundColor: "#514e5a",
                                    outline: "none !important",
                                    border: "none",
                                },
                            }}
                        >
                            GET STARTED
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default LandingPage;
