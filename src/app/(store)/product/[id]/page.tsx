import getAxiosClient from '@Utils/getAxiosClient';
import { apiEndpoints } from '@Config';
import Head from 'next/head';
import { JsonSchema, ProductDetails } from '@Components';
import { getProductJson } from '@Components/JsonSchema';
import { Product } from '@Types';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = {
	params: Promise<{ id: string }>;
};

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const { product } = await getProduct(id);

	if (!product) return {};

	return {
		title: `${product.title} | Your Next Storefront`,
		description: `Discover details about ${product.title} including price, category, and description.`
	};
}

export default async function Page({ params }: Props) {
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
