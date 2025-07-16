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
    const response = await axios.get(`https://ow-api.com/v1/stats/${data.platform}/${data.region}/${formattedBattletag}/heroes/dva`);
    return response.data;
}
