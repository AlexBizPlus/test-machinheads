export const Routes = {
  HOME: `/`,
  LOGIN: `/login`,
  READ_ARTICLE: `/read-article`,
  ADD_ARTICLE: `/add-article`,
};

export const DefaultUser = {
  email: 'test@test.ru',
  password: 'khro2ij3n2730',
};

// ------------------ API -----------------

export const API_URL = 'http://rest-test.machineheads.ru';
export const REQUEST_TIMEOUT = 5000;

export const API_ROUTES = {
  GET_TOKEN: '/auth/token-generate',
  GET_REFRESH_TOKEN: '/auth/token-refresh',
  GET_PROFILE: '/profile',
  GET_POSTS: '/manage/posts',
  GET_TAGS: '/manage/tags',
  GET_AUTHORS: '/manage/authors',
};

export const POST_ROUTES = {
  POST_DETAILS: '/detail',
  ADD_POST: '/add',
  DELETE_POST: '/remove',
};

export const ResponseStatus = {
  OK: 200,
};
