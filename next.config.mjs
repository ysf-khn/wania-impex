/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["cdn.sanity.io"],
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
