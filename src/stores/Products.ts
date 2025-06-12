import { Product } from '@Types';
import { create } from 'zustand';

type State = Record<`${number}`, Product[]>;
type Action = {
	setProducts: (sortingId: string, products: Product[]) => void;
};

const useProductsStore = create<State & Action>((set) => ({
	setProducts: (sortingId, products) => set(() => ({ [sortingId]: products }))
}));

export default useProductsStore;
