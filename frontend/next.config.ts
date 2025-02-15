import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  module.exports = {
    webpack: (config) => {
    config.resolve.alias.canvas = false;
    
    return config;
    },
  }
};

export default nextConfig;
