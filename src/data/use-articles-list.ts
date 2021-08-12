import useSWR from 'swr';
import { API_ROUTES, API_URL } from '../const';
import { listFetcher } from '../libs/list-fetcher';

const useArticlesList = () => {
  const { data, mutate, error } = useSWR(`${API_URL}${API_ROUTES.GET_POSTS}`, listFetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const loading = !data && !error;

  return {
    loading,
    error,
    articles: data?.data,
    mutate,
  };
};

export default useArticlesList;
