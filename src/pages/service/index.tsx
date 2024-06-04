import CommonAPI from "../../lib/commonAPI";

export const fetchUsers = async () => {
    const users = await CommonAPI.get("/users");
    return users.data;
};

export const fetchAlbums = async (userId: number) => {
    const albums = await CommonAPI.get(`/albums?userId=${userId}`);
    return albums.data;
};
