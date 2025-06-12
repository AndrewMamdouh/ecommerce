export type Product = {
	id: number;
	title: string;
	image: string;
	price: number;
	description: string;
	category: string;
	rating: {
		rate: number;
		count: number;
	};
};

export type ProductsFilters = {
	categories: string[];
	price: {
		min: number;
		max: number;
	};
};

export type ProductsSorting = {
	id: `${number}`;
	label: string;
	name: string;
	value: string | null;
};
