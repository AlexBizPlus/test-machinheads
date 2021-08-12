import { createAPI } from './api-user';

export const listFetcher = async (url: string) => {
  const api = createAPI();
  return api.get(url);
};
