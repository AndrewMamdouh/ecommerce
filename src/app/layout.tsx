import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
	title: 'Your Next Store - Home',
	description: 'Online Store to fulfill all of your needs'
};

export default async function RootLayout({
	children
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className="h-full antialiased">
			<body className="flex min-h-full flex-col">
				<div className="flex min-h-full flex-1 flex-col bg-white">
					{children}
				</div>
			</body>
		</html>
	);
}
