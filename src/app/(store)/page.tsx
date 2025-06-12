import getAxiosClient from '@Utils/getAxiosClient';
import { apiEndpoints } from '@Config';
import Head from 'next/head';
import { JsonSchema, Products } from '@Components';
import { getProductsJson } from '@Components/JsonSchema';
import { Product } from '@Types';

const getCategories = async () => {
	try {
		const axiosClient = getAxiosClient();
		const { data } = await axiosClient.get<string[]>(
			apiEndpoints.getCategories(),
			{
				fetchOptions: {
					cache: 'force-cache'
				}
			}
		);
		return data
			? { categories: data, hasError: false }
			: {
					categories: [],
					hasError: true
				};
	} catch (_) {
		return {
			categories: [],
			hasError: true
		};
	}
};

const getProducts = async () => {
	try {
		const axiosClient = getAxiosClient();
		const { data } = await axiosClient.get<Product[]>(
			apiEndpoints.getProducts()
		);
		return data
			? { products: data, hasError: false }
			: {
					products: [],
					hasError: true
				};
	} catch (_) {
		return {
			products: [],
			hasError: true
		};
	}
};

export default async function Page() {
	const { categories } = await getCategories();
	const { products } = await getProducts();
	return (
		<>
			<Head>
				<JsonSchema json={getProductsJson(products)} />
			</Head>
			<Products categories={categories} products={products} />
		</>
	);
}
