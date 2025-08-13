import { apiRequest } from "./api";

export const getBoardList = async (params) => {
    console.log(params);
    return apiRequest({
        method: 'GET',
        url: `/board/posts`,
        params: {category : params},
    });
}

export const postBoard = async (options) => {
    console.log('options',options);
    return apiRequest({
        method: options.method === 'POST' ? 'POST' : 'PATCH',
        url: '/board/post',
        // params: options.params,
        data: options.data,
    });
}

export const deleteBoard = async (id) => {
    return apiRequest({
        method: 'DELETE',
        url: `/board/post/${id}`,
    });
}

export const postBoardComment = async (options) => {
    return apiRequest({
        method: options.method === 'POST' ? 'POST' : 'PATCH',
        url: '/board/comment',
        data: options.data,
    });
}

export const deleteBoardComment = async (id) => {
    return apiRequest({
        method: 'DELETE',
        url: `/board/comment/${id}`,
    });
}

