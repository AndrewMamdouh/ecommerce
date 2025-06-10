import axios, { AxiosInstance } from 'axios';

let axiosClient: AxiosInstance | null = null;

const getAxiosClient = (): AxiosInstance => {
	if (!axiosClient)
		axiosClient = axios.create({
			baseURL: process.env.NEXT_PUBLIC_API,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	return axiosClient;
};

export default getAxiosClient;
