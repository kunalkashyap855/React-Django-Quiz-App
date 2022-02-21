export const PROD_SERVER = "https://kunalkashyap.pythonanywhere.com/"
export const DEV_SERVER = "http://localhost:8000/"

export const toAPIURL = (pathname: string) =>
  `${PROD_SERVER}${
    pathname.startsWith("/") ? pathname.substring(1, pathname.length) : pathname
  }`;