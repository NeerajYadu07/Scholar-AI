/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'img.clerk.com' },
      { hostname: 'res.cloudinary.com' },
      { hostname: 'groq.com' },
    ],
  },
}

export default nextConfig
