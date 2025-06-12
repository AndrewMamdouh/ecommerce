'use client';

import { useEffect, useState } from 'react';
import { FunnelIcon } from '@heroicons/react/20/solid';
import ProductsFilterDialog from './ProductsFilterDialog';
import ProductsFilterSidebar from './ProductsFilterSidebar';
import ProductsSorting from './ProductsSorting';
import { productsSortOptions } from '@Constants';
import getSortedProducts from '@Utils/getSortedProducts';
import {
	Product,
	ProductsFilters,
	ProductsSorting as ProductsSortingType
} from '@Types';
import ProductList from './ProductsList';

type ProductsProps = {
	categories: string[];
	products: Product[];
};

const Products = ({ categories, products }: ProductsProps) => {
	const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
	const [activeSorting, setActiveSorting] = useState<ProductsSortingType>(
		productsSortOptions[0]
	);
	const [filteredSortedProducts, setFilteredSortedProducts] =
		useState(products);
	const sortedByPrice = getSortedProducts('6', products);
	const { 0: low, [sortedByPrice.length - 1]: high } = sortedByPrice;
	const [activeFilter, setActiveFilter] = useState<ProductsFilters>({
		categories,
		price: {
			min: low.price,
			max: high.price
		}
	});

	useEffect(() => {
		const filteredProducts = products.filter(
			({ category, price }) =>
				activeFilter.categories.includes(category) &&
				price >= activeFilter.price.min &&
				price <= activeFilter.price.max
		);
		const sortedProducts = getSortedProducts(
			activeSorting.id,
			filteredProducts
		);
		setFilteredSortedProducts(sortedProducts);
	}, [activeFilter, activeSorting, products]);

	const handleFilterChange = ([key, value]:
		| ['categories', string]
		| ['price', Partial<Record<'min' | 'max', number>>]) => {
		if (key === 'categories') {
			setActiveFilter((prevFilters) => ({
				categories: prevFilters.categories.includes(value)
					? prevFilters.categories.filter(
							(category) => category !== value
						)
					: [...prevFilters.categories, value],
				price: { ...prevFilters.price }
			}));
		} else {
			setActiveFilter((prevFilters) => ({
				categories: [...prevFilters.categories],
				price: {
					...prevFilters.price,
					...value
				}
			}));
		}
	};

	return (
		<div className="overflow-hidden bg-white">
			<div>
				<ProductsFilterDialog
					isOpen={isFilterDialogOpen}
					setIsOpen={setIsFilterDialogOpen}
					categories={categories}
					activeFilter={activeFilter}
					onFilterChange={handleFilterChange}
					minPrice={low.price}
					maxPrice={high.price}
				/>
				<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex items-baseline justify-between border-b border-gray-200 pt-12 pb-6">
						<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
							New Arrivals
						</h1>

						<div className="flex items-center">
							<ProductsSorting
								activeSorting={activeSorting}
								onSortingChange={setActiveSorting}
							/>
							<button
								type="button"
								onClick={() => setIsFilterDialogOpen(true)}
								className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
							>
								<span className="sr-only">Filters</span>
								<FunnelIcon
									aria-hidden="true"
									className="size-5"
								/>
							</button>
						</div>
					</div>

					<section aria-labelledby="products-heading" className="">
						<h2 id="products-heading" className="sr-only">
							Products
						</h2>

						<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
							<div className="hidden lg:block">
								<ProductsFilterSidebar
									categories={categories}
									activeFilter={activeFilter}
									onFilterChange={handleFilterChange}
									minPrice={low.price}
									maxPrice={high.price}
								/>
							</div>
							<div className="overflow-auto h-[calc(100vh-180px)] lg:col-span-3">
								<ProductList
									products={filteredSortedProducts}
								/>
							</div>
						</div>
					</section>
				</section>
			</div>
		</div>
	);
};

export default Products;
