/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ['@mui/material', '@mui/icons-material'],
  images: {
    domains: [
      'images.unsplash.com',
      'i.etsystatic.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'i.etsystatic.com'
      }
    ]
  },
};

export default nextConfig;
