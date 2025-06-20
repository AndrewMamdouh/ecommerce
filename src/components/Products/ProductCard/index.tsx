import { Product } from '@Types';
import Image from 'next/image';
import Link from 'next/link';

type ProductCardProps = {
	product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
	const ratingActiveStars = Math.floor(product.rating.rate);
	return (
		<li className="relative flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
			<Link
				href={`/product/${product.id}`}
				className="relative mx-3 mt-3 flex max-h-64 overflow-hidden rounded-xl"
			>
				<Image
					className="object-contain transition-opacity opacity-0 duration-[2s]"
					onLoad={(e) =>
						e.currentTarget.classList.remove('opacity-0')
					}
					onError={(e) =>
						e.currentTarget.setAttribute(
							'src',
							'/images/product-skeleton.jpg'
						)
					}
					src={product.image}
					alt={product.title}
					width={500}
					height={500}
				/>
			</Link>
			<div className="mt-4 px-5 pb-5">
				<Link href={`/product/${product.id}`}>
					<h5 className="tracking-tight text-slate-900">
						{product.title}
					</h5>
				</Link>
				<div className="mt-2 mb-5 flex flex-col gap-4 justify-center">
					<div className="flex items-center">
						{Array(ratingActiveStars)
							.fill(null)
							.map((_, starIdx) => (
								<svg
									key={starIdx}
									aria-hidden="true"
									className="h-5 w-5 text-yellow-400"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
								</svg>
							))}
						{Array(5 - ratingActiveStars)
							.fill(null)
							.map((_, starIdx) => (
								<svg
									key={starIdx}
									aria-hidden="true"
									className="h-5 w-5 text-gray-400"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
								</svg>
							))}
						<span className="ml-3 text-black text-sm font-semibold leading-none">
							{product.rating.rate} ({product.rating.count})
						</span>
					</div>
					<p>
						<span className="text-xl font-bold text-slate-900">
							${product.price}
						</span>
					</p>
				</div>
				<button className="cursor-pointer flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-slate-400">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="mr-2 size-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
						/>
					</svg>
					Add to cart
				</button>
			</div>
		</li>
	);
};

export default ProductCard;
