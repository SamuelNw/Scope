import { Box, Grid, Typography } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { chartHeaderStyles } from "../utilities/customStyles";

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

// Minicomponent to show the donut key:
const DonutKey = ({
    keyColor,
    userName,
    albumCount,
}: {
    keyColor: string;
    userName: string;
    albumCount: number;
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: { xs: 1.5, md: 1, lg: 1.5 },
                flex: 1,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                    sx={{
                        borderRadius: "50%",
                        backgroundColor: keyColor,
                        width: 10,
                        height: 10,
                        mr: 1,
                    }}
                />
                <Typography
                    sx={{ color: "#1c1c1c", fontSize: 13, fontWeight: 400 }}
                >
                    {userName}
                </Typography>
            </Box>
            <Box>
                <Typography
                    sx={{ color: "#000000", fontSize: 14, fontWeight: 400 }}
                >
                    {albumCount}
                </Typography>
            </Box>
        </Box>
    );
};

// Chart cell colors
const COLORS = [
    "#FF6F61",
    "#6B5B95",
    "#88B04B",
    "#F7CAC9",
    "#92A8D1",
    "#F7786B",
    "#034F84",
    "#DD4124",
    "#45B8AC",
    "#D65076",
];

export default function UsersAlbumsChart({
    usersArray,
}: Readonly<{
    usersArray: User[];
}>) {
    return (
        <Grid
            sx={{
                width: "100%",
                height: "100%",
                minHeight: {
                    xs: 500,
                    md: 300,
                },
                backgroundColor: "#F7F9FB",
                borderRadius: 6,
                p: 3,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        lg: "row",
                    },
                    justifyContent: {
                        xs: "flex-start",
                        lg: "space-between",
                    },
                    alignItems: {
                        xs: "flex-start",
                        lg: "center",
                    },
                    mb: 2,
                }}
            >
                <Box
                    sx={{
                        width: "fit-content",
                        display: "flex",
                        flex: 1,
                        alignItems: "center",
                        mb: {
                            xs: 2,
                            lg: 0,
                        },
                    }}
                >
                    <Typography
                        sx={{
                            ...chartHeaderStyles,
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        Album Count Per User
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 1,
                    flexDirection: {
                        xs: "column",
                        lg: "row",
                    },
                }}
            >
                <Box
                    sx={{
                        height: { xs: 200, md: 300, lg: 200 },
                        width: "100%",
                        flex: {
                            md: 1,
                            lg: 0.4,
                        },
                        display: "flex",
                        alignItems: "center",
                        mb: {
                            xs: 2,
                            md: 1,
                            lg: 0,
                        },
                    }}
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={usersArray}
                                innerRadius={35}
                                outerRadius={90}
                                paddingAngle={3}
                                dataKey="albumCount"
                                cornerRadius={4}
                            >
                                {usersArray.map((entry: User, index) => (
                                    <Cell
                                        key={`cell-${entry.name}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    borderRadius: 8,
                                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                    border: "1px solid transparent",
                                }}
                                itemStyle={{
                                    fontSize: 12,
                                    fontFamily: "Poppins",
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
                <Box
                    sx={{
                        flex: { xs: 1, md: 0.55 },
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    {usersArray.map((entry, index) => (
                        <DonutKey
                            key={entry.name}
                            keyColor={COLORS[index % COLORS.length]}
                            userName={entry.name}
                            albumCount={entry.albumCount!}
                        />
                    ))}
                </Box>
            </Box>
        </Grid>
    );
}
