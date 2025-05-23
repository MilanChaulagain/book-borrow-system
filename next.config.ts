import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'placehold.co',
        },
        {
          protocol: 'https',
          hostname: 'm.media-amazon.com'
        },
        {
          protocol: 'https',
          hostname: 'ik.imagekit.io',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com'
        },
        {
          protocol: 'https',
          hostname: 'cdn.discordapp.com'
        },
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com'
        }
      ]
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true
    }
};

export default nextConfig;
