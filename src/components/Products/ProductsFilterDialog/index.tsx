import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	Disclosure,
	DisclosureButton,
	DisclosurePanel
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { ProductsFilters } from '@Types';
import { Slider } from '@Components/ui/slider';
import { Input } from '@Components/ui/input';
import { useDebounceCallback } from 'usehooks-ts';
import { useEffect, useState } from 'react';
import { Button } from '@Components/ui/button';

type ProductsFilterDialogProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	categories: string[];
	activeFilter: ProductsFilters;
	onFilterChange: ([key, value]:
		| ['categories', string]
		| ['price', Partial<Record<'min' | 'max', number>>]) => void;
	onReset: VoidFunction;
	minPrice: number;
	maxPrice: number;
};

const ProductsFilterDialog = ({
	isOpen,
	setIsOpen,
	categories,
	activeFilter,
	onFilterChange,
	onReset,
	minPrice,
	maxPrice
}: ProductsFilterDialogProps) => {
	const [price, setPrice] = useState({ min: minPrice, max: maxPrice });
	const debouncedOnFilterChange = useDebounceCallback(onFilterChange, 500);

	useEffect(() => {
		debouncedOnFilterChange(['price', { ...price }]);
	}, [price]);

	useEffect(() => {
		setPrice({ ...activeFilter.price });
	}, [activeFilter.price.min, activeFilter.price.max]);

	return (
		<Dialog
			open={isOpen}
			onClose={setIsOpen}
			className="relative z-40 lg:hidden"
		>
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
			/>

			<div className="fixed inset-0 z-40 flex">
				<DialogPanel
					transition
					className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
				>
					<div className="flex items-center justify-between px-4">
						<h2 className="font-medium text-gray-900">Filters</h2>
						<button
							type="button"
							onClick={() => setIsOpen(false)}
							className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
						>
							<span className="absolute -inset-0.5" />
							<span className="sr-only">Close menu</span>
							<XMarkIcon aria-hidden="true" className="size-6" />
						</button>
					</div>

					{/* Filters */}
					<form className="mt-4 border-gray-200 flex flex-col">
						<Disclosure
							as="div"
							className="border-t border-gray-200 px-4 py-2"
						>
							<h3 className="">
								<DisclosureButton className="group flex w-full items-center justify-between bg-white py-2 text-gray-400 hover:text-gray-500">
									<span className="text-sm font-medium text-gray-900">
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
								<div className="space-y-6">
									{categories.map((option, optionIdx) => (
										<div
											key={option}
											className="flex gap-3 text-sm"
										>
											<div className="flex h-5 shrink-0 items-center">
												<div className="group grid size-4 grid-cols-1">
													<input
														defaultValue={option}
														id={`filter-mobile-${option}-${optionIdx}`}
														name={option}
														type="checkbox"
														checked={activeFilter?.categories.includes(
															option
														)}
														onChange={(e) =>
															onFilterChange([
																'categories',
																e.target.value
															])
														}
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
												htmlFor={`filter-mobile-${option}-${optionIdx}`}
												className="capitalize min-w-0 flex-1 text-gray-500"
											>
												{option}
											</label>
										</div>
									))}
								</div>
							</DisclosurePanel>
						</Disclosure>
						<Disclosure
							as="div"
							className="border-t border-gray-200 px-4 py-2"
						>
							<h3>
								<DisclosureButton className="group flex w-full items-center justify-between bg-white py-2 text-gray-400 hover:text-gray-500">
									<span className="text-sm font-medium text-gray-900">
										Price
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
														min: Number(
															e.target.value
														)
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
														max: Number(
															e.target.value
														)
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
							className="cursor-pointer h-auto mt-4 mx-4 grow text-white hover:text-white bg-slate-900 font-medium rounded-sm text-sm px-5 py-2.5 flex items-center justify-center hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-slate-400"
						>
							Reset
						</Button>
					</form>
				</DialogPanel>
			</div>
		</Dialog>
	);
};

export default ProductsFilterDialog;
