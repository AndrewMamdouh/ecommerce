'use client';

import { Product } from '@Types';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import ProductCard from '../ProductCard';
import clsx from 'clsx';

type ProductsListProps = {
	products: Product[];
	className?: string;
};

const ProductsList = ({ products, className }: ProductsListProps) => {
	return (
		<ResponsiveMasonry
			columnsCountBreakPoints={{ 350: 1, 500: 2, 1280: 3 }}
			className={clsx('p-2 sm:p-6 lg:p-8', className)}
		>
			<Masonry itemTag="ul" gutter="5rem" sequential>
				{products.map((product) => {
					return <ProductCard key={product.id} product={product} />;
				})}
			</Masonry>
		</ResponsiveMasonry>
	);
};

export default ProductsList;
