import axios from "axios";

const BASE_PATH = process.env.BASE_PATH;
//Create React App 에서 사용시 process.env.REACT_APP_BASE_PATH;
export const getReviews = async () => {
    const response = await axios.get(`${BASE_PATH}/api`);
    return response.data;
};

export const getTest = async (no) => {
    return `AAAA${no}`;
};

/***
 * @params
 * platform : pc || etc
 * region   : us || eu || asia
 * battletag : Your battlenet tag, replacing the # with a -
 */
export const getProfile = async (data) => {
    //platform : pc || etc
    const formattedBattletag = data.battletag.replace(/#/g, "-");
    const response = await axios.get(`https://ow-api.com/v1/stats/${data.platform}/${data.region}/${formattedBattletag}/heroes/bastion`);
    return response.data;
}