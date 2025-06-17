import { API } from "./api";


export const verifyUserId = async (username) => {
    const response = await API.get(`/users/check-id?username=${username}`);
    return response.data;
}

export const signUpUser = async (bodyData) => {
    const response = await API.post(`/users/sign-up`,bodyData );
    return response.data;
}

export const loginUser = async (bodyData) => {
    const response = await API.post(`/users/login`,bodyData);
    return response.data;
    // return response.data;
}