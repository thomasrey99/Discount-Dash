import {db} from '@/firebase/config';
import {collection, query, where, getDocs} from 'firebase/firestore';
import { type Products, Product } from '@/utils/types';

export const handler = async (shopId: string, value: string) => {
	const productsRef = collection(db, 'products');
	let productsQuery = query(productsRef, where('shopId', '==', shopId));

	if (value === 'expired') {
		productsQuery = query(productsQuery, where('status', '==', value));
	}

	const productsSnapshot = await getDocs(productsQuery);

	const products: Products[] = [];

	productsSnapshot.forEach(doc => {
		const product = doc.data() as Product; 
		products.push({
			id: doc.id,
			...product })
		});
	

	return products;
};
