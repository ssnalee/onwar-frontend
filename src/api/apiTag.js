import { apiRequest } from "./api";


export const getHashtagList = async (id = 0) => {
    return apiRequest({
        method: 'get',
        url: '/hashtags/list',
        params: { hashtag_id: id },
    });
}

export const getBattletagList = async () => {
    return apiRequest({
        method: 'get',
        url: '/battletags/list',
    });
    // console.log('res',response);
    // return response;
}

export const postBattletag = async (tag) => {
    return apiRequest({
        method: 'post',
        url: '/battletags',
        params: { battletag : tag },
    });
}

export const patchBattletag = async ({id,tag}) => {
    return apiRequest({
        method: 'patch',
        url: '/battletags',
        params: { 
            post_id : id,
            battletag : tag 
        },
    });
}

export const deleteBattletag = async (id) => {
    return apiRequest({
        method: 'delete',
        url: '/battletags',
        params: { 
            post_id : id,
        },
    });
}