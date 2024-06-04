import CommonAPI from "../../lib/commonAPI";

export const fetchUsers = async () => {
    const users = await CommonAPI.get("/users");
    return users.data;
};
