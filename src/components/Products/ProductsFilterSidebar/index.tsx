import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel
} from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { Slider } from '@Components/ui/slider';
import { Input } from '@Components/ui/input';
import { ProductsFilters } from '@Types';
import { useEffect, useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import { Button } from '@Components/ui/button';

type ProductsFilterSidebarProps = {
	categories: string[];
	activeFilter: ProductsFilters;
	onFilterChange: ([key, value]:
		| ['categories', string]
		| ['price', Partial<Record<'min' | 'max', number>>]) => void;
	onReset: VoidFunction;
	minPrice: number;
	maxPrice: number;
};

const ProductsFilterSidebar = ({
	categories,
	activeFilter,
	onFilterChange,
	onReset,
	minPrice,
	maxPrice
}: ProductsFilterSidebarProps) => {
	const [price, setPrice] = useState({ min: minPrice, max: maxPrice });
	const debouncedOnFilterChange = useDebounceCallback(onFilterChange, 500);

	useEffect(() => {
		debouncedOnFilterChange(['price', { ...price }]);
	}, [price]);

	useEffect(() => {
		setPrice({ ...activeFilter.price });
	}, [activeFilter.price.min, activeFilter.price.max]);

	return (
		<>
			<Disclosure as="div" className="border-b border-gray-200 py-2">
				<h3>
					<DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
						<span className="font-medium text-gray-900">
							Category
						</span>
						<span className="ml-6 flex items-center">
							<PlusIcon
								aria-hidden="true"
								className="size-5 group-data-open:hidden"
							/>
							<MinusIcon
								aria-hidden="true"
								className="size-5 group-not-data-open:hidden"
							/>
						</span>
					</DisclosureButton>
				</h3>
				<DisclosurePanel className="pt-6">
					<div className="space-y-4">
						{categories.map((option, optionIdx) => (
							<div key={option} className="flex gap-3">
								<div className="flex h-5 shrink-0 items-center">
									<div className="group grid size-4 grid-cols-1">
										<input
											defaultValue={option}
											checked={activeFilter?.categories.includes(
												option
											)}
											onChange={(e) =>
												onFilterChange([
													'categories',
													e.target.value
												])
											}
											id={`filter-${option}-${optionIdx}`}
											name={option}
											type="checkbox"
											className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
										/>
										<svg
											fill="none"
											viewBox="0 0 14 14"
											className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
										>
											<path
												d="M3 8L6 11L11 3.5"
												strokeWidth={2}
												strokeLinecap="round"
												strokeLinejoin="round"
												className="opacity-0 group-has-checked:opacity-100"
											/>
											<path
												d="M3 7H11"
												strokeWidth={2}
												strokeLinecap="round"
												strokeLinejoin="round"
												className="opacity-0 group-has-indeterminate:opacity-100"
											/>
										</svg>
									</div>
								</div>
								<label
									htmlFor={`filter-${option}-${optionIdx}`}
									className="capitalize text-sm text-gray-600"
								>
									{option}
								</label>
							</div>
						))}
					</div>
				</DisclosurePanel>
			</Disclosure>
			<Disclosure as="div" className="border-b border-gray-200 py-2">
				<h3>
					<DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
						<span className="font-medium text-gray-900">Price</span>
						<span className="ml-6 flex items-center">
							<PlusIcon
								aria-hidden="true"
								className="size-5 group-data-open:hidden"
							/>
							<MinusIcon
								aria-hidden="true"
								className="size-5 group-not-data-open:hidden"
							/>
						</span>
					</DisclosureButton>
				</h3>
				<DisclosurePanel className="pt-6">
					<div>
						<Slider
							min={minPrice}
							max={maxPrice}
							value={[price.min, price.max]}
							onValueChange={([min, max]) =>
								setPrice({ min, max })
							}
						/>
						<div className="flex flex-row space-x-4 mt-5">
							<div className="basis-1/2">
								<label
									htmlFor="min-price"
									className="block text-sm font-medium mb-2 dark:text-neutral-200"
								>
									Min:
								</label>
								<Input
									id="min-price"
									className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
									type="number"
									value={price.min}
									onChange={(e) =>
										setPrice((prevPrice) => ({
											...prevPrice,
											min: Number(e.target.value)
										}))
									}
								/>
							</div>
							<div className="basis-1/2">
								<label
									htmlFor="max-price"
									className="block text-sm font-medium mb-2 dark:text-neutral-200"
								>
									Max:
								</label>
								<Input
									id="max-price"
									className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
									type="number"
									value={price.max}
									onChange={(e) =>
										setPrice((prevPrice) => ({
											...prevPrice,
											max: Number(e.target.value)
										}))
									}
								/>
							</div>
						</div>
					</div>
				</DisclosurePanel>
			</Disclosure>
			<Button
				onClick={onReset}
				variant="default"
				type="button"
				className="cursor-pointer h-auto mt-4 w-full text-white hover:text-white bg-slate-900 font-medium rounded-sm text-sm px-5 py-2.5 flex items-center justify-center hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-slate-400"
			>
				Reset
			</Button>
		</>
	);
};

export default ProductsFilterSidebar;
