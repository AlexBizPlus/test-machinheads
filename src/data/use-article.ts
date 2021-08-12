import useSWR from 'swr';
import { API_ROUTES, API_URL, POST_ROUTES } from '../const';
import { articleFetcher } from '../libs/api-article';

const useArticle = (id: string) => {
  const { data, mutate, error } = useSWR(
    [`${API_URL}${API_ROUTES.GET_POSTS}${POST_ROUTES.POST_DETAILS}`, id],
    (url, id) => articleFetcher(url, id),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );

  const loading = !data && !error;
  const loggedOut = error;

  return {
    loading,
    loggedOut,
    error,
    article: data?.data,
    mutate,
  };
};

export default useArticle;
