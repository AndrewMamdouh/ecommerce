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
	title: 'Explore Products | Your Next Storefront',
	description: 'Online Store to fulfill all of your needs',
	icons: '/logo.svg'
};

export default async function RootLayout({
	children
}: Readonly<{ children: React.ReactNode }>) {
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
