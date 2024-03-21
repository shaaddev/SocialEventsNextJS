/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'se-bn-local.s3.us-east-1.amazonaws.com',
            },
        ],
    },
}

module.exports = nextConfig
