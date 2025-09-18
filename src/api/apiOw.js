import axios from "axios";

/***
 * @params
 * platform : pc || etc
 * region   : us || eu || asia
 * battletag : Your battlenet tag, replacing the # with a -
 */
export const getProfile = async (data) => {
    //platform : pc || etc
    const formattedBattletag = encodeURIComponent(data.battletag.replace(/#/g, "-"));
    // console.log('formattedBattletag',formattedBattletag);
    const response = await axios.get(`https://ow-api.com/v1/stats/${data.platform}/${data.region}/${formattedBattletag}/heroes/ana`);
    return response.data;
}


export const getFastProfile = async (data) => {
    //platform : pc || etc
    const formattedBattletag = encodeURIComponent(data.battletag.replace(/#/g, "-"));
    // console.log('formattedBattletag',formattedBattletag);
    const response = await axios.get(`https://overfast-api.tekrop.fr/players/${formattedBattletag}/stats/summary?gamemode=competitive`);
    return response.data;
    // 
}

export const getHeros = async () => {
    const response = await axios.get(`https://overfast-api.tekrop.fr/heroes?locale=ko-kr`);
    return response.data;
}

export const getHerosIntroduction = async (hero) => {
    const response = await axios.get(`https://overfast-api.tekrop.fr/heroes/${hero}?locale=ko-kr`);
    return response.data;
}