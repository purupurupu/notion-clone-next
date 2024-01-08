/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["ypfphsxejnwlfaykwxou.supabase.co"],
  },
};

module.exports = nextConfig;
