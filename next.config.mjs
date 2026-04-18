/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**"
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb", 
    },
  },
};

export default nextConfig;