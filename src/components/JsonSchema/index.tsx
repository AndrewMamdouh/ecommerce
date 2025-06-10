import type {
	ItemList,
	Product as SchemaProduct,
	Thing,
	WithContext,
	CollectionPage
} from 'schema-dts';
import { Product } from '@/types';

const JsonSchema = <T extends Thing>({ json }: { json: WithContext<T> }) => {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
		/>
	);
};

export const getProductJson = (
	product: Product
): WithContext<SchemaProduct> => {
	return {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product.title,
		image: product.image,
		description: product.description,
		sku: product.id.toString(),
		category: product.category,
		url: `${process.env.NEXT_PUBLIC_CLIENT}/product/${product.id}`,
		offers: {
			'@type': 'Offer',
			url: `${process.env.NEXT_PUBLIC_CLIENT}/product/${product.id}`,
			price: product.price,
			priceCurrency: 'USD',
			availability: 'https://schema.org/InStock',
			itemCondition: 'https://schema.org/NewCondition'
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: product.rating.rate,
			reviewCount: product.rating.count
		}
	};
};

export const getProductsJson = (
	products: readonly Product[]
): WithContext<ItemList> => {
	return {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		itemListElement: products.map(getProductJson)
	};
};

export const getCategoryProductsJson = (
	categoryName: string,
	products: Product[]
): WithContext<CollectionPage> => {
	return {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: categoryName,
		url: `${process.env.NEXT_PUBLIC_CLIENT}/${categoryName}`,
		mainEntity: {
			'@type': 'ItemList',
			name: `${categoryName} Products`,
			numberOfItems: products.length,
			itemListElement: products.map((product, idx) => ({
				position: idx + 1,
				...getProductJson(product)
			}))
		}
	};
};

export const getCategoriesJson = (
	categories: string[]
): WithContext<CollectionPage> => ({
	'@context': 'https://schema.org',
	'@type': 'CollectionPage',
	name: 'All Categories',
	url: `${process.env.NEXT_PUBLIC_CLIENT}/categories`,
	mainEntity: {
		'@type': 'ItemList',
		name: 'Product Categories',
		numberOfItems: categories.length,
		itemListElement: categories.map((category, idx) => ({
			'@type': 'ListItem',
			position: idx + 1,
			item: {
				'@type': 'ProductCollection',
				name: category,
				url: `${process.env.NEXT_PUBLIC_CLIENT}/${category}`
			}
		}))
	}
});

export default JsonSchema;
