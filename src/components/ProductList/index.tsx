'use client';

import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

type ProductListProps = {
	products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {
	return (
		<ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
                <Masonry itemTag='ul' gutter='1rem'>
				{products.map((product, idx) => {
					return (
						<li key={product.id} className="group">
							<Link href={`/product/${product.id}`}>
								<article className="overflow-hidden rounded border bg-white">
									<div className="aspect-square w-full overflow-hidden bg-neutral-100">
										<Image
											className="group-hover:rotate hover-perspective w-full bg-neutral-100 object-cover object-center transition-opacity group-hover:opacity-75"
											src={product.image}
											width={768}
											height={768}
											loading={idx < 3 ? 'eager' : 'lazy'}
											priority={idx < 3}
											sizes="(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 700px"
											alt=""
										/>
									</div>

									<div className="p-4">
										<h2 className="text-lg font-semibold text-neutral-700">
											{product.title}
										</h2>
										<footer className="text-sm font-medium text-neutral-900">
											<p>${product.price}</p>
										</footer>
									</div>
								</article>
							</Link>
						</li>
					);
				})}
			</Masonry>
		</ResponsiveMasonry>
	);
};

export default ProductList;
