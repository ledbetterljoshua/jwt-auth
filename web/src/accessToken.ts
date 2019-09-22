let accessToken = "";

export const setAccessToken = (val: string) => {
  accessToken = val;
};
export const getAccessToken = (): string => {
  return accessToken;
};
