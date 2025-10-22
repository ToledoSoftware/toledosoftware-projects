// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // Placeholder domain
        port: '',
        pathname: '/**',
      },
      // --- TMDB Domain ---
      {
        protocol: 'https',
        hostname: 'image.tmdb.org', // Added TMDB domain
        port: '',
        pathname: '/**', // Allows any image path from this domain
      },
      // --- END TMDB Domain ---
    ],
  },
};

export default nextConfig;