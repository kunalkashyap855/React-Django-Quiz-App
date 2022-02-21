// const ENVIRONMENT_STAGE = "production";
const ENVIRONMENT_STAGE = "development";
export const SERVER =
ENVIRONMENT_STAGE === "development"
    ? "http://localhost:8000/"
    : "https://therightguru.com/";

export const toAPIURL = (pathname: string) =>
  `${SERVER}${
    pathname.startsWith("/") ? pathname.substring(1, pathname.length) : pathname
  }`;