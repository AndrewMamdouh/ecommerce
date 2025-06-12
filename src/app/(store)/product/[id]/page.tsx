import getAxiosClient from '@Utils/getAxiosClient';
import { apiEndpoints } from '@Config';
import Head from 'next/head';
import { JsonSchema, ProductDetails } from '@Components';
import { getProductJson } from '@Components/JsonSchema';
import { Product } from '@Types';
import { notFound } from 'next/navigation';

const getProduct = async (id: string) => {
	try {
		const axiosClient = getAxiosClient();
		const { data } = await axiosClient.get<Product>(
			apiEndpoints.getProduct(id)
		);
		return data
			? { product: data, hasError: false }
			: {
					product: null,
					hasError: true
				};
	} catch (_) {
		return {
			products: null,
			hasError: true
		};
	}
};

export default async function Page({
	params
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const { product } = await getProduct(id);
	if (!id || !product) notFound();
	return (
		<>
			<Head>
				<JsonSchema json={getProductJson(product)} />
			</Head>
			<ProductDetails product={product} />
		</>
	);
}
