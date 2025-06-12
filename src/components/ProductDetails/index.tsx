'use client';

import Image from 'next/image';
import { Button } from '@Components/ui/button';
import { Product } from '@Types';

type ProductDetailsProps = {
	product: Product;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
	const ratingActiveStars = Math.floor(product.rating.rate);
	return (
		<section className="grow py-32 bg-white antialiased mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
				<div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
					<div className="shrink-0 max-w-md mx-auto">
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
					</div>

					<div className="mt-6 sm:mt-8 lg:mt-0">
						<h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
							{product.title}
						</h1>
						<div className="mt-4 sm:items-center sm:gap-4 sm:flex">
							<p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
								${product.price}
							</p>

							<div className="flex items-center gap-2 mt-2 sm:mt-0">
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
								</div>
								<p className="text-sm font-medium leading-none text-gray-500">
									({product.rating.rate})
								</p>
								<a
									href="#"
									className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline"
								>
									{product.rating.count} Reviews
								</a>
							</div>
						</div>

						<div className="mt-6 gap-2 items-stretch flex flex-col sm:gap-4 sm:items-center sm:flex-row sm:mt-8">
							<Button
								variant="outline"
								className="cursor-pointer h-auto flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
							>
								<svg
									className="size-5"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
									/>
								</svg>
								Add to favorites
							</Button>
							<Button
								variant="outline"
								className="cursor-pointer h-auto text-white hover:text-white bg-cyan-600 hover:bg-cyan-700 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none flex items-center justify-center"
							>
								<svg
									className="size-5"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
									/>
								</svg>
								Add to cart
							</Button>
						</div>

						<hr className="my-6 md:my-8 border-gray-200" />

						<p className="mb-6 text-gray-500">
							{product.description}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductDetails;
