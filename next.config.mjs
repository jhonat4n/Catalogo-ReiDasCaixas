/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  transpilePackages: ["next-sanity", "sanity"],
  images: { remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }] },
};

export default nextConfig;
