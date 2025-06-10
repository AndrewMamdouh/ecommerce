'use server';
import getAxiosClient from '@/utils/getAxiosClient';
import { apiEndpoints } from '@/config';
import Head from 'next/head';
import { JsonSchema, ProductList } from '@/components';
import { getProductsJson } from '@/components/JsonSchema';
import { Product } from '@/types';
// import Error from 'next/error';

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
	} catch (err) {
		return {
			products: [],
			hasError: true
		};
	}
};

export default async function Page() {
	const { products, hasError } = await getProducts();
	return (
		<>
			<Head>
				<JsonSchema json={getProductsJson(products)} />
			</Head>
			<ProductList products={products} />
		</>
	);
}
