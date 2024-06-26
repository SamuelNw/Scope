import axios from "axios";

const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
});

const get = async (url: string) => {
    return await instance.get(url);
};

const post = async (url: string, params: any) => {
    return instance
        .post(url, params)
        .then((response) => {
            const responseData = response.data;
            return responseData;
        })
        .catch((error) => {
            throw error;
        });
};

const patch = async (url: string, data: any) => {
    try {
        const response = await instance.patch(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const setContentType = (contentType: string) => {
    instance.defaults.headers.common["Content-Type"] = contentType;
};

const setAccept = (acceptType: string) => {
    instance.defaults.headers.common["Accept"] = acceptType;
};

const CommonAPI = {
    post,
    get,
    patch,
    setContentType,
    setAccept,
};

export default CommonAPI;
