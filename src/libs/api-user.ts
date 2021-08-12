import axios from 'axios';
import { API_ROUTES, API_URL, REQUEST_TIMEOUT } from '../const';
import { ILogin, ILoginResponse } from '../types';
import { getTokenFromCookie } from '../utils';

export const loginFetcher = async ({ email, password }: ILogin) => {
  if (email && password) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return await axios({
      method: 'post',
      url: `${API_URL}${API_ROUTES.GET_TOKEN}`,
      data: formData,
    })
      .then(async (res) => {
        const data = await userFetcher(res.data as unknown as ILoginResponse);
        document.cookie = `accessToken=${res.data?.access_token}`;
        document.cookie = `refreshToken=${res.data?.refresh_token}`;
        return data;
      })
      .catch((err) => console.log(err));
  }
  if (!email && !password && getTokenFromCookie(document.cookie, 'accessToken')) {
    const api = createAPI();
    return api.get(API_ROUTES.GET_PROFILE);
  }

  const error = new Error('Not authorized!');
  throw error;
};

const userFetcher = async (data: ILoginResponse) => {
  const { access_token } = data;
  return await axios({
    method: 'get',
    url: `${API_URL}${API_ROUTES.GET_PROFILE}`,
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const createAPI = () => {
  const apiInstance = axios.create({
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT,
  });

  apiInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getTokenFromCookie(document.cookie, 'accessToken')}`;
    return config;
  });

  apiInstance.interceptors.response.use(
    (config) => {
      return config;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && error.config && !error.config?._isRetry) {
        originalRequest._isRetry = true;
        try {
          const formData = new FormData();
          const response = await axios.post(`${API_URL}${API_ROUTES.GET_REFRESH_TOKEN}`, {
            headers: { Authorization: `Bearer ${getTokenFromCookie(document.cookie, 'refreshToken')}` },
            data: formData,
          });
          document.cookie = `refreshToken=${response}`;
          return apiInstance.request(originalRequest);
        } catch (e) {
          console.log('e', e);
        }
      }
      throw error;
    },
  );

  return apiInstance;
};
