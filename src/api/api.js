import axios from "axios";
import { Router } from "react-router-dom";

const BASE_PATH = process.env.REACT_APP_BASE_PATH;

export const API = axios.create({
    baseURL: `${BASE_PATH}/api`,
    headers: {
      Accept: "*/*",
    },
});

API.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = token;
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
      if (error.response) {
        if (error.response.status === 500){
          Router.push('/error');
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

