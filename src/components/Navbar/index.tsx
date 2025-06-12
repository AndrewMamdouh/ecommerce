import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => (
	<nav className="bg-gray-800 sticky inset-0 z-10">
		<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
			<div className="relative flex h-16 items-center justify-between">
				<div className="w-full flex items-center justify-between">
					<Link className="flex shrink-0 items-center" href="/">
						<Image
							width={32}
							height={32}
							src="/logo.svg"
							alt="logo"
							priority
						/>
					</Link>
					<Link
						href="https://www.linkedin.com/in/andrewmamdouh"
						target="_black"
						className={
							'capitalize rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
						}
					>
						@AndrewMamdouh
					</Link>
				</div>
			</div>
		</div>
	</nav>
);

export default Navbar;
