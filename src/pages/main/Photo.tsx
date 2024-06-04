import {
    Grid,
    Typography,
    CircularProgress,
    Box,
    Button,
    Paper,
    Modal,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editPhotoTitle, fetchPhoto } from "../service";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface Photo {
    albumId: string;
    id: string;
    title: string;
    url: string;
    thumbnail: string;
}

type PositionType = "absolute";

export const modalStyle = {
    position: "absolute" as PositionType,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#F3EEF4",
    border: "2px solid transparent",
    borderRadius: "10px",
    boxShadow: 12,
    p: 3,
    width: {
        xs: "90%",
        sm: "70%",
        md: "30%",
    },
};

export const outerBoxCustomStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
};

export const innerBoxCustomStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
};

const Photo = () => {
    const { photoId } = useParams();
    const photoID = parseInt(photoId!);
    const [photoData, setPhotoData] = useState<Photo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
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

    const handleShowModal = () => {
        setIsModalOpen(!isModalOpen);
        setTitle(photoData?.title || "");
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!photoData) {
            console.error("Photo data not available.");
            return;
        }

        try {
            const updatedPhoto = await editPhotoTitle(
                title,
                parseInt(photoData.id)
            );
            setPhotoData(updatedPhoto);

            // Redirect to the updated photo details page
            navigate(`/photo/${updatedPhoto.id}`);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error editing photo title:", error);
        }
    };

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
                                onClick={handleShowModal}
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

            <Modal open={isModalOpen} onClose={handleShowModal}>
                <Box sx={modalStyle}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 3,
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="h2"
                            sx={{
                                fontSize: "20px",
                                fontWeight: 700,
                                color: "#1a76d1",
                            }}
                        >
                            Edit Photo Title
                        </Typography>

                        <Button
                            type="button"
                            variant="text"
                            onClick={handleShowModal}
                            sx={{
                                color: "black",
                                height: "38px",
                                width: "fit-content",
                                p: "10px 17px 10px 17px",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: 500,
                                outline: "none !important",
                            }}
                        >
                            <CloseIcon />
                        </Button>
                    </Box>

                    <Box sx={outerBoxCustomStyle}>
                        <Box sx={innerBoxCustomStyle}>
                            <Typography sx={{ mb: 2, color: "black" }}>
                                Enter the desired title
                            </Typography>
                            <form onSubmit={onSubmit}>
                                <TextField
                                    label="Photo title"
                                    type="text"
                                    size="small"
                                    autoFocus={true}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    sx={{ width: "100%" }}
                                />

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        mt: 2,
                                    }}
                                >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            borderRadius: "8px",
                                            fontSize: "14px",
                                            fontWeight: 500,
                                            outline: "none !important",
                                        }}
                                    >
                                        {!isLoading ? (
                                            <>
                                                Submit
                                                <ArrowForwardIcon
                                                    sx={{
                                                        ml: 1,
                                                        fontSize: "18px",
                                                    }}
                                                />
                                            </>
                                        ) : (
                                            "Loading..."
                                        )}
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Grid>
    );
};

export default Photo;
