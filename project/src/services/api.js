import axios from 'axios';

const BASE_URL = 'https://7.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,
};


const createApi = (onUnauthorized, onApiUnavailable) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();
    }
    if (response.status >= HttpCode.SERVER_ERROR) {
      onApiUnavailable();
    }

    throw err;
  };

  axiosInstance.interceptors.response.use(onSuccess, onFail);
  axiosInstance.interceptors.request.use((config) => {
    config.headers = { 'x-token': localStorage.getItem('token') ?? '' };
    return config;
  });
  return axiosInstance;
};

export {createApi};
