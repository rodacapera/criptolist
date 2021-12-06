/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://criptolist-3v4fgitbf-rodacapera.vercel.app/api/:path*',
      },
    ]
  },
}
