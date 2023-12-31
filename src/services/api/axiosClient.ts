import axios from 'axios';
import { AppError } from 'utils/AppError';

import apiConfig from './apiConfig';

const api = axios.create({
  baseURL: apiConfig.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    include_adult: false,
    include_video: true,
    language: 'pt-BR',
    api_key: apiConfig.apiKey,
  },
});

api.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.status_message));
    } else {
      return Promise.reject(error);
    }
  },
);

export { api };
