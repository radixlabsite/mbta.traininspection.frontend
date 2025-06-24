/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlashes: false,
};

export default nextConfig;
