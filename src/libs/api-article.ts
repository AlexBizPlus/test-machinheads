import { API_ROUTES, POST_ROUTES } from '../const';
import { createAPI } from './api-user';

export const articleFetcher = async (url: string, id: string) => {
  const api = createAPI();
  return api.get(`${url}?id=${+id}`);
};

export const deleteArticleFetcher = async (id: string) => {
  const api = createAPI();
  return api({
    method: 'delete',
    url: `${API_ROUTES.GET_POSTS}${POST_ROUTES.DELETE_POST}?id=${id}`,
  })
    .then((response) => {
      return {
        errorMessage: '',
        responseStatus: response.status,
      };
    })
    .catch((error) => {
      return {
        errorMessage: error.response?.data?.message,
        responseStatus: error.response?.status,
      };
    });
};

export const addArticle = (articleData: FormData) => {
  const api = createAPI();

  return api({
    method: 'post',
    url: `${API_ROUTES.GET_POSTS}${POST_ROUTES.ADD_POST}`,
    data: articleData,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((response) => {
      return {
        errorMessage: '',
        responseStatus: response.status,
      };
    })
    .catch((error) => {
      return {
        errorMessage: error.response?.data?.message,
        responseStatus: error.response?.status,
      };
    });
};
