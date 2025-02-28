export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? (process.env.NEXT_PUBLIC_SITE_DEV_URL as string)
    : (process.env.NEXT_PUBLIC_SITE_PROD_URL as string);
