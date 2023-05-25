import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import axiosRetry, { isNetworkOrIdempotentRequestError } from 'axios-retry';
import { customAlphabet } from 'nanoid';
import { PUBLIC_URLS } from '@/auth/constants';
import { ACCESS_TOKEN_KEY, API_URI } from '@/env/constants';
import { CookiesUtils } from '@/common/utils/cookies';
import { DomUtils } from '@/common/utils/dom';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const randomId = () => customAlphabet(ALPHABET, 32)();

const myAxios = axios.create({
  baseURL: API_URI,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosRetry(myAxios, {
  retries: 5,
  retryCondition: e => {
    return isNetworkOrIdempotentRequestError(e) || e.response?.status === 502;
  },
  retryDelay: axiosRetry.exponentialDelay,
});

myAxios.interceptors.response.use(
  function (response) {
    return response.data.data;
  },
  function (error: AxiosError) {
    const path = location.pathname;
    if (error?.response?.status === 403 && !DomUtils.isServer() && !PUBLIC_URLS.includes(path)) {
      CookiesUtils.remove(ACCESS_TOKEN_KEY);
      location.href = '/login';
    }

    return Promise.reject(error.response?.data);
  }
);

export const RestApis = myAxios;

export type RestApiConfig = AxiosRequestConfig;
