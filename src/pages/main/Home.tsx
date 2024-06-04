import { Button, Grid, Paper } from "@mui/material";
import GenericTable from "../../components/GenericTable";
import { useEffect, useState } from "react";
import { fetchAlbums, fetchUsers } from "../service";
import { useNavigate } from "react-router";

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

interface UserDataListTypes extends Array<User> {}

const Home = () => {
    const navigate = useNavigate();

    const columns = [
        {
            name: "id",
            label: "ID",
        },
        {
            name: "name",
            label: "NAME",
        },
        {
            name: "username",
            label: "USERNAME",
        },
        {
            name: "email",
            label: "EMAIL",
        },
        {
            name: "albumCount",
            label: "ALBUM COUNT",
        },
        {
            name: "actions",
            label: "ACTIONS",
        },
    ];

    const [usersList, setUsersList] = useState<UserDataListTypes>([]);

    const populateUsersList = async () => {
        try {
            const users = await fetchUsers();
            const userAlbumsPromises = users.map((user: User) =>
                fetchAlbums(user.id)
            );
            const albumsData = await Promise.all(userAlbumsPromises);

            const usersWithAlbumCount = users.map(
                (user: User, index: number) => ({
                    ...user,
                    albumCount: albumsData[index].length,
                    actions: (
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => navigate(`/user/${user.id}`)}
                        >
                            View
                        </Button>
                    ),
                })
            );

            setUsersList(usersWithAlbumCount);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    useEffect(() => {
        populateUsersList();
    }, []);

    return (
        <Grid
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    lex: 1,
                    overflowY: "scroll",
                    pb: 2,
                    maxWidth: {
                        xs: "380px",
                        sm: "600px",
                        md: "100%",
                    },
                }}
            >
                <GenericTable
                    columns={columns}
                    data={usersList}
                    title="Users"
                />
            </Paper>
        </Grid>
    );
};

export default Home;
