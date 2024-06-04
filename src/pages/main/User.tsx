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
import { fetchAlbums, fetchUser } from "../service";
import GenericTable from "../../components/GenericTable";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
    albumCount?: number;
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

interface Geo {
    lat: string;
    lng: string;
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

interface Album {
    id: number;
    title: string;
    userId: number;
}

const customUserDetailsStyles = {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid grey",
    py: 1,
};

const User = () => {
    const { userId } = useParams();
    const userID = parseInt(userId!);
    const [userData, setUserData] = useState<User | null>(null);
    const [userAlbums, setUserAlbums] = useState(null);
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
            name: "actions",
            label: "ACTIONS",
        },
    ];

    const fetchData = async (userId: number) => {
        setIsLoading(true);
        try {
            const user = await fetchUser(userId);
            setUserData(user);
            const userAlbums = await fetchAlbums(userId);
            const albums = userAlbums.map((album: Album) => ({
                ...album,
                actions: (
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/album/${album.id}`)}
                    >
                        View
                    </Button>
                ),
            }));
            setUserAlbums(albums);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(userID);
    }, [userID]);

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
            ) : userData && userAlbums ? (
                <>
                    <Typography
                        variant="h6"
                        sx={{ color: "black", mb: 1 }}
                    >{`Details for ${userData?.name || ""}`}</Typography>
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
                            <Typography
                                sx={{
                                    color: "black",
                                    fontSize: 15,
                                    alignSelf: "end",
                                    textDecoration: "underline",
                                }}
                            >
                                PERSONAL INFORMATION
                            </Typography>
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
                                    {userData.id}
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
                                    USERNAME:
                                </Typography>{" "}
                                <Typography sx={{ color: "black" }}>
                                    {userData.username}
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
                                    FULL NAME:
                                </Typography>{" "}
                                <Typography sx={{ color: "black" }}>
                                    {userData.name}
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
                                    EMAIL:
                                </Typography>{" "}
                                <Typography sx={{ color: "black" }}>
                                    {userData.email}
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
                                    PHONE:
                                </Typography>{" "}
                                <Typography sx={{ color: "black" }}>
                                    {userData.phone}
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
                                    WEBSITE:
                                </Typography>{" "}
                                <Typography sx={{ color: "black" }}>
                                    {userData.website}
                                </Typography>{" "}
                            </Box>
                        </Grid>

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
                            <Typography
                                sx={{
                                    color: "black",
                                    fontSize: 15,
                                    alignSelf: "end",
                                    textDecoration: "underline",
                                }}
                            >
                                ADDRESS
                            </Typography>
                            <Box sx={customUserDetailsStyles}>
                                <Typography
                                    sx={{
                                        color: "#1a76d1",
                                        mr: 1,
                                        fontWeight: "bold",
                                    }}
                                >
                                    ADDRESS:
                                </Typography>{" "}
                                <Typography sx={{ color: "black" }}>
                                    {userData.address.suite},{" "}
                                    {userData.address.street}
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
                                    CITY:
                                </Typography>{" "}
                                <Typography sx={{ color: "black" }}>
                                    {userData.address.city}
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
                                    ZIP-CODE:
                                </Typography>{" "}
                                <Typography sx={{ color: "black" }}>
                                    {userData.address.zipcode}
                                </Typography>{" "}
                            </Box>

                            <Typography
                                sx={{
                                    color: "black",
                                    fontSize: 15,
                                    alignSelf: "end",
                                    textDecoration: "underline",
                                    mt: 3,
                                }}
                            >
                                COMPANY DETAILS
                            </Typography>

                            <Box sx={customUserDetailsStyles}>
                                <Typography
                                    sx={{
                                        color: "#1a76d1",
                                        mr: 1,
                                        fontWeight: "bold",
                                    }}
                                >
                                    COMPANY NAME:
                                </Typography>{" "}
                                <Typography sx={{ color: "black" }}>
                                    {userData.company.name}
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
                                    BS:
                                </Typography>{" "}
                                <Typography sx={{ color: "black" }}>
                                    {userData.company.bs}
                                </Typography>{" "}
                            </Box>
                        </Grid>
                    </Grid>

                    <Typography
                        variant="h6"
                        sx={{ color: "black", fontSize: 16, my: 1 }}
                    >
                        Albums Owned
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
                            data={userAlbums}
                            title="All Albums"
                        />
                    </Paper>
                </>
            ) : (
                <Grid item xs={12}>
                    <Typography variant="body1" sx={{ color: "black" }}>
                        User not found.
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default User;
