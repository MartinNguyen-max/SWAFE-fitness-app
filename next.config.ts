import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents is turned off on purpose (see docs/decisions.md D9)
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
