export const logout = () => {
  document.cookie = `accessToken=''`;
  document.cookie = `refreshToken=''`;
};
