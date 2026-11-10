/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/delhi-specials',
        destination: '/specials',
        permanent: true,
      },
      {
        source: '/delhi-delivery',
        destination: '/market-area',
        permanent: true,
      },
      {
        source: '/delhi-delivery/:slug',
        destination: '/market-area/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
