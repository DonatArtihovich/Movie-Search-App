/** @type {import('next').NextConfig} */
import path from 'node:path'

const nextConfig = {
    images: {
        domains: ['image.tmdb.org'],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'app')],
  },
};

export default nextConfig;
