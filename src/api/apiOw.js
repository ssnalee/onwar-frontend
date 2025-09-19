import axios from "axios";

const BASE_URL = "https://overfast-api.tekrop.fr";
const OW_URL = "https://ow-api.com";

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
    const response = await axios.get(`${OW_URL}/v1/stats/${data.platform}/${data.region}/${formattedBattletag}/heroes/ana`);
    return response.data;
}


export const getFastProfile = async (data) => {
    //platform : pc || etc
    const formattedBattletag = encodeURIComponent(data.battletag.replace(/#/g, "-"));
    // console.log('formattedBattletag',formattedBattletag);
    const response = await axios.get(`${BASE_URL}/players/${formattedBattletag}/stats/summary?gamemode=competitive`);
    return response.data;
    // 
}

export const getHeros = async () => {
    const response = await axios.get(`${BASE_URL}/heroes?locale=ko-kr`);
    return response.data;
}

export const getHerosIntroduction = async (hero) => {
    const response = await axios.get(`${BASE_URL}/heroes/${hero}?locale=ko-kr`);
    return response.data;
}

export const getHerosPickPercent = async (role) => {
    const response = await axios.get(`${BASE_URL}heroes/stats?platform=pc&gamemode=competitive&region=asia&role=${role}&order_by=hero%3Aasc`);
    return response.data;
}