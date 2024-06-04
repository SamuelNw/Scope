import {
    Grid,
    Typography,
    CircularProgress,
    Box,
    Button,
    Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPhoto } from "../service";

interface Photo {
    albumId: string;
    id: string;
    title: string;
    url: string;
    thumbnail: string;
}

const Photo = () => {
    const { photoId } = useParams();
    const photoID = parseInt(photoId!);
    const [photoData, setPhotoData] = useState<Photo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const fetchData = async (photoId: number) => {
        setIsLoading(true);
        try {
            const photo = await fetchPhoto(photoId);
            setPhotoData(photo);
        } catch (error) {
            console.error("Error fetching photos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(photoID);
    }, [photoID]);

    return (
        <Grid
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 2,
            }}
        >
            {isLoading ? (
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: "50px",
                    }}
                >
                    <CircularProgress />
                </Grid>
            ) : photoData ? (
                <Paper
                    elevation={1}
                    sx={{
                        px: 3,
                        py: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minWidth: {
                            xs: "80vw",
                            sm: "50vw",
                            md: "40vw",
                            lg: "25vw",
                        },
                    }}
                >
                    <Typography variant="h6" sx={{ color: "black", mb: 1 }}>
                        Photo Details:
                    </Typography>

                    <Grid
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                height: 250,
                                minWidth: "100%",
                                borderRadius: "8px",
                                border: "1px solid transparent",
                                backgroundColor: "lightgrey",
                            }}
                        >
                            <img
                                src={photoData.url}
                                alt="Photo"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                mt: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    height: 80,
                                    minWidth: 80,
                                    borderRadius: "8px",
                                    border: "1px solid transparent",
                                    backgroundColor: "lightgrey",
                                }}
                            >
                                <img
                                    src={photoData.url}
                                    alt="Photo"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                    ml: 2,
                                    pb: "-30px",
                                }}
                            >
                                <Box sx={{ display: "flex" }}>
                                    <Typography
                                        sx={{
                                            color: "#1a76d1",
                                            mr: 1,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        PHOTO_ID:
                                    </Typography>{" "}
                                    <Typography sx={{ color: "black" }}>
                                        {photoData.id}
                                    </Typography>{" "}
                                </Box>

                                <Box sx={{ display: "flex" }}>
                                    <Typography
                                        sx={{
                                            color: "#1a76d1",
                                            mr: 1,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        ALBUM_ID:
                                    </Typography>{" "}
                                    <Typography sx={{ color: "black" }}>
                                        {photoData.albumId}
                                    </Typography>{" "}
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                my: 2,
                            }}
                        >
                            <Box sx={{ display: "flex" }}>
                                <Typography
                                    sx={{
                                        color: "#1a76d1",
                                        mr: 1,
                                        fontWeight: "bold",
                                    }}
                                >
                                    Title:
                                </Typography>{" "}
                                <Typography sx={{ color: "black" }}>
                                    {photoData.title}
                                </Typography>{" "}
                            </Box>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    outline: "none !important",
                                    alignSelf: "flex-end",
                                    my: 1,
                                }}
                            >
                                Edit
                            </Button>
                        </Box>
                    </Grid>
                </Paper>
            ) : (
                <Grid item xs={12}>
                    <Typography variant="body1">Data not found.</Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default Photo;
