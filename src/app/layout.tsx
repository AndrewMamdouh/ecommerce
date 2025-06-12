import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import clsx from 'clsx';
import { Navbar } from '@Components';

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--inter-font'
});

export const metadata: Metadata = {
	title: 'Your Next Store - Home',
	description: 'Online Store to fulfill all of your needs',
	icons: '/logo.svg'
};

// const getCategories = async () => {
// 	try {
// 		const axiosClient = getAxiosClient();
// 		const { data } = await axiosClient.get<string[]>(
// 			apiEndpoints.getCategories(),
// 			{
// 				fetchOptions: {
// 					cache: 'force-cache'
// 				}
// 			}
// 		);
// 		return data
// 			? { categories: data, hasError: false }
// 			: {
// 					categories: [],
// 					hasError: true
// 				};
// 	} catch (_) {
// 		return {
// 			categories: [],
// 			hasError: true
// 		};
// 	}
// };

export default async function RootLayout({
	children
}: Readonly<{ children: React.ReactNode }>) {
	// const { categories } = await getCategories();
	return (
		<html
			lang="en"
			className={clsx('h-full antialiased font-primary', inter.variable)}
			suppressHydrationWarning
		>
			<body className="flex min-h-full flex-col">
				<Navbar />
				<div className="flex min-h-full flex-1 flex-col bg-white">
					{children}
				</div>
			</body>
		</html>
	);
}
