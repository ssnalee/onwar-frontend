import axios from "axios";
import { setError } from '../store/userSlice';
import { store } from '../store';

const BASE_PATH = process.env.REACT_APP_BASE_PATH;

export const API = axios.create({
    baseURL: `${BASE_PATH}/api`,
    headers: {
      Accept: "*/*",
    },
});

export const apiRequest = async ({method = "get", url, params, data}) => {
  const config = {
    method,
    url,
  }
  if (params) config.params = params;
  if (data) config.data = data;

  const response = await API(config);
  return response.data;
}

API.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (resposne) => resposne,
    (error) => {
      const isNotLoginPage = window.location.pathname !== '/login';
      if(isNotLoginPage && error.response.status === 401 || error.response.data?.msg === '토큰이 유효하지 않습니다.'){
        console.log('dddddd');
        store.dispatch(setError({status : error.response.status, msg : error.response.data?.msg}));
      }
      if (error.response) {
        if (error.response.status === 500){
          window.location.href = '/error';
        }
      }
      return Promise.reject(error);
    }
)
  
//Create React App 에서 사용시 process.env.REACT_APP_BASE_PATH;
export const getReviews = async () => {
    const response = await axios.get(`${BASE_PATH}/api`);
    return response.data;
};

export const getTest = async (no) => {
    return `AAAA${no}`;
};

