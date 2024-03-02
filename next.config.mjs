/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.kakkoi.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
