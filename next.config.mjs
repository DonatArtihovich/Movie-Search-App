/** @type {import('next').NextConfig} */
import path from 'node:path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
    images: {
        domains: ['image.tmdb.org'],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'app')],
  },
};

export default nextConfig;
