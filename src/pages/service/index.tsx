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

export const fetchAlbum = async (id: number) => {
    const album = await CommonAPI.get(`/albums/${id}`);
    return album.data;
};

export const fetchPhotos = async (id: number) => {
    const photos = await CommonAPI.get(`/photos?albumId=${id}`);
    return photos.data;
};

export const fetchPhoto = async (id: number) => {
    const photo = await CommonAPI.get(`/photos/${id}`);
    return photo.data;
};

export const editPhotoTitle = async (text: string, id: number) => {
    try {
        const updatedPhoto = await CommonAPI.patch(`/photos/${id}`, {
            title: text,
        });
        return updatedPhoto;
    } catch (error) {
        throw error;
    }
};
