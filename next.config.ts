import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {},
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ["**/evaluation/**", "**/.git/**", "**/node_modules/**"],
      };
    }
    return config;
  },
};

export default nextConfig;
