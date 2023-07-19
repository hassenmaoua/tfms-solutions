export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname;
export const toApiUrl = (pathname) =>
  process.env.REACT_APP_API_PUBLIC_URL + pathname;
