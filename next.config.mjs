/** @type {import('next').NextConfig} */
const nextConfig = {
  // We keep our own lint flow out of the production build so a stray warning
  // never blocks a deploy. Type-checking still runs during build.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
