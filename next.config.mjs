/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['image.tmdb.org'],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'app')],
  },
};

export default nextConfig;
