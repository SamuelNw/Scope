import {
    Grid,
    Typography,
    CircularProgress,
    Box,
    Paper,
    Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAlbum, fetchPhotos } from "../service";
import GenericTable from "../../components/GenericTable";

interface Album {
    id: number;
    title: string;
    userId: number;
}

interface Photo {
    albumId: string;
    id: string;
    title: string;
    url: string;
    thumbnail: string;
}

const customUserDetailsStyles = {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid grey",
    py: 1,
};

const Album = () => {
    const { albumId } = useParams();
    const albumID = parseInt(albumId!);
    const [albumData, setAlbumData] = useState<Album | null>(null);
    const [photos, setPhotos] = useState<Photo[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const columns = [
        {
            name: "id",
            label: "ID",
        },
        {
            name: "title",
            label: "TITLE",
        },
        {
            name: "url",
            label: "URL",
        },
        {
            name: "actions",
            label: "ACTIONS",
        },
    ];

    const fetchData = async (albumId: number) => {
        setIsLoading(true);
        try {
            const album = await fetchAlbum(albumId);
            setAlbumData(album);
            const photos = await fetchPhotos(albumId);
            const editedPhotos = photos.map((photo: Photo) => ({
                ...photo,
                actions: (
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/photo/${photo.id}`)}
                    >
                        View
                    </Button>
                ),
            }));
            setPhotos(editedPhotos);
        } catch (error) {
            console.error("Error fetching photos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(albumID);
    }, [albumID]);

    return (
        <Grid
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 2,
            }}
        >
            <Typography
                variant="h6"
                sx={{ color: "black", mb: 1 }}
            >{`Details for album: ${albumData?.title || ""}`}</Typography>
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
            ) : albumData && photos ? (
                <>
                    <Grid
                        sx={{
                            display: "flex",
                            flexDirection: {
                                xs: "column",
                                md: "row",
                            },
                            justifyContent: {
                                md: "space-between",
                            },
                            width: "100%",
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                            md={5}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                py: 1,
                            }}
                        >
                            <Box sx={customUserDetailsStyles}>
                                <Typography
                                    sx={{
                                        color: "#1a76d1",
                                        mr: 1,
                                        fontWeight: "bold",
                                    }}
                                >
                                    DATABASE_ID:
                                </Typography>{" "}
                                <Typography sx={{ color: "black" }}>
                                    {albumData.id}
                                </Typography>{" "}
                            </Box>
                            <Box sx={customUserDetailsStyles}>
                                <Typography
                                    sx={{
                                        color: "#1a76d1",
                                        mr: 1,
                                        fontWeight: "bold",
                                    }}
                                >
                                    TITLE:
                                </Typography>{" "}
                                <Typography sx={{ color: "black" }}>
                                    {albumData.title}
                                </Typography>{" "}
                            </Box>

                            <Box sx={customUserDetailsStyles}>
                                <Typography
                                    sx={{
                                        color: "#1a76d1",
                                        mr: 1,
                                        fontWeight: "bold",
                                    }}
                                >
                                    NUMBER OF PHOTOS:
                                </Typography>{" "}
                                <Typography sx={{ color: "black" }}>
                                    {photos.length}
                                </Typography>{" "}
                            </Box>
                        </Grid>
                    </Grid>

                    <Typography
                        variant="h6"
                        sx={{ color: "black", fontSize: 16, my: 2 }}
                    >
                        Photos In Album
                    </Typography>

                    <Paper
                        elevation={0}
                        sx={{
                            flex: 1,
                            overflowY: "scroll",
                            pb: 2,
                            width: {
                                xs: "380px",
                                sm: "600px",
                                md: "100%",
                            },
                        }}
                    >
                        <GenericTable
                            columns={columns}
                            data={photos}
                            title="All Photos"
                        />
                    </Paper>
                </>
            ) : (
                <Grid item xs={12}>
                    <Typography variant="body1">Data not found.</Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default Album;
