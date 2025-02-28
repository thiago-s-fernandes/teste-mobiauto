import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SITE_BASE_URL: process.env.SITE_BASE_URL
  }
};

export default nextConfig;
