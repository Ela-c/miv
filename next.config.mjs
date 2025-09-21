/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		allowedDevOrigins: ["http://192.168.1.103:3000"],
	},
	async rewrites() {
		const backend =
			process.env.NEXT_PUBLIC_BACKEND_URL ||
			process.env.PUBLIC_BACKEND_URL ||
			"http://localhost:3001";
		return [
			{
				source: "/backend/:path*",
				destination: `${backend}/:path*`,
			},
		];
	},
};

export default nextConfig;
