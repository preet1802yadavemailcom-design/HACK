/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  reactStrictMode: false,
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
