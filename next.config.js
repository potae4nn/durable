/** @type {import('next').NextConfig} */
const APP_BASE_PATH = process.env.APP_BASE_PATH;

const nextConfig = {
  basePath: APP_BASE_PATH,
  env: {
    APP_BASE_PATH: APP_BASE_PATH,
  },
  images: {
    domains: ['shc.sut.ac.th','203.158.7.33'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

module.exports = nextConfig;
