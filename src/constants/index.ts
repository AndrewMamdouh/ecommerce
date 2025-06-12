import { ProductsSorting } from '@Types';

export const productsSortOptions: ProductsSorting[] = [
	{ id: '1', label: 'Featured', name: 'default', value: null },
	{ id: '2', label: 'Alphabetically, A-Z', name: 'name', value: 'asc' },
	{ id: '3', label: 'Alphabetically, Z-A', name: 'name', value: 'desc' },
	{ id: '4', label: 'Rating, Low to High', name: 'rating', value: 'asc' },
	{ id: '5', label: 'Rating, High to Low', name: 'rating', value: 'desc' },
	{ id: '6', label: 'Price, Low to High', name: 'price', value: 'asc' },
	{ id: '7', label: 'Price, High to Low', name: 'price', value: 'desc' }
];
