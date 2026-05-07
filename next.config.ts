import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
};

export default nextConfig;
