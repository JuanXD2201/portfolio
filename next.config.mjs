// Export estático para GitHub Pages: https://juanxd2201.github.io/portfolio/
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/portfolio' : '';

/** @type {import('next').NextConfig} */
export default {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true }, // las imágenes ya se optimizan en scripts/optimize-images.mjs
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  poweredByHeader: false,
  reactStrictMode: true,
};
