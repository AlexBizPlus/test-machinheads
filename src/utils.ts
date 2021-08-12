export const getTokenFromCookie = (data: string, searchItem: string) =>
  data
    .split(';')
    .filter((item) => item.includes(searchItem))[0]
    .split('=')[1];
