import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
