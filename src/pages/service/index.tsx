import CommonAPI from "../../lib/commonAPI";

export const fetchUsers = async () => {
    const users = await CommonAPI.get("/users");
    return users.data;
};

export const fetchAlbums = async (userId: number) => {
    const albums = await CommonAPI.get(`/albums?userId=${userId}`);
    return albums.data;
};

export const fetchUser = async (id: number) => {
    const user = await CommonAPI.get(`/users/${id}`);
    return user.data;
};