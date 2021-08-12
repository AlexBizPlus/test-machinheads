import useSWR from 'swr'
import { API_ROUTES, API_URL } from "../const";
import {loginFetcher} from "../libs/api-user";

const useUser = () => {
  const { data, mutate, error } = useSWR(`${API_URL}${API_ROUTES.GET_TOKEN}`, loginFetcher, {revalidateOnFocus: false, shouldRetryOnError: false });
  
  const loading = !data && !error
  const loggedOut = error;

  return {
    loading,
    loggedOut,
    error,
    user: data?.data,
    mutate
  };
}

export default useUser
