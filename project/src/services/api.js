import axios from 'axios';

const BASE_URL = 'https://7.react.pages.academy/six-cities';

const HttpCode = {
  UNAUTHORIZED: 401,
};

const token = localStorage.getItem('token') ?? '';

const createApi = (onUnauthorized) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      'x-token': token,
    },
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();
    }

    throw err;
  };

  axiosInstance.interceptors.response.use(onSuccess, onFail);
  return axiosInstance;
};

export const api = createApi();
