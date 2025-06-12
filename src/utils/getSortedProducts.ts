import { Product } from '@Types';

const getSortedProducts = (sortingId: `${number}`, products: Product[]) => {
	switch (sortingId) {
		case '1':
			return products;
		case '2':
			return products.sort((x, y) => x.title.localeCompare(y.title));
		case '3':
			return products.sort((x, y) => y.title.localeCompare(x.title));
		case '4':
			return products.sort((x, y) => x.rating.rate - y.rating.rate);
		case '5':
			return products.sort((x, y) => y.rating.rate - x.rating.rate);
		case '6':
			return products.sort((x, y) => x.price - y.price);
		case '7':
			return products.sort((x, y) => y.price - x.price);
		default:
			return products;
	}
};

export default getSortedProducts;
