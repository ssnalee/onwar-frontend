import { API } from "./api";


export const getHashtagList = async (id = 0) => {
    const response = await API.get(`/hashtags/list?hashtag_id=${id}`);
    return response.data;
}