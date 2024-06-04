import { Box, Grid, Paper, Typography } from "@mui/material";
import GenericTable from "../../components/GenericTable";
import { useEffect, useState } from "react";
import { fetchUsers } from "../service";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
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
    const columns = ["id", "name", "username", "email"];

    const [usersList, setUsersList] = useState<UserDataListTypes>([]);

    const populateUsersList = async () => {
        try {
            const data = await fetchUsers();
            setUsersList(data);
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
                height: "100%",
                display: "flex",
                flexDirection: "column",
                py: 2,
                overflowY: "scroll",
                // border: "5px solid red",
            }}
        >
            <Typography variant="h6" sx={{ color: "#1a76d1", my: 4 }}>
                Currently, only the following users are in the database:{" "}
            </Typography>

            <Paper elevation={3} sx={{ pb: 2 }}>
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
