import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: process.env.NODE_ENV === 'development',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'fakestoreapi.com'
			}
		]
	}
};

export default nextConfig;
