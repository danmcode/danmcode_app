/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'via.placeholder.com', // Agrega el dominio del que traerás las imágenes
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
