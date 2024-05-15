import { FilePlus2, Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { db } from '@/lib/prisma';

export const getProductsData = async () => {
	const [products, orders] = await Promise.all([db.product.count(), db.sales.count()]);

	return {
		products,
		orders,
	};
};

export const ProductActions = async () => {
	const { products, orders } = await getProductsData();

	return (
		<>
			<div className='bg-white rounded-xl border border-gray-200 p-6'>
				<div className='flex items-center space-x-4 mb-4'>
					<div className='flex-shrink-0 h-8 w-8 rounded-lg relative bg-indigo-200 text-indigo-700'>
						<FilePlus2 className='h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
					</div>
					<h3 className='font-medium line-clamp-1'>Add a new product</h3>
				</div>

				<Link href='/products'>
					<button className='text-sm bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 w-full line-clamp-1'>
						<span>Add a new product</span>
						<Plus className='h-5 w-5 ms-2' />
					</button>
				</Link>
			</div>

			<div className='bg-white rounded-xl border border-gray-200 p-6'>
				<div className='flex items-center space-x-4 mb-4'>
					<div className='flex-shrink-0 h-8 w-8 rounded-lg relative bg-indigo-200 text-indigo-700'>
						<FilePlus2 className='h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
					</div>
					<h3 className='font-medium line-clamp-1'>Add a new order</h3>
				</div>

				<Link href='/orders'>
					<button className='text-sm bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 w-full line-clamp-1'>
						<span>Add a new order</span>
						<Plus className='h-5 w-5 ms-2' />
					</button>
				</Link>
			</div>

			<div className='bg-white rounded-xl border border-gray-200 p-6'>
				<div className='flex items-center space-x-4 mb-4'>
					<div className='flex-shrink-0 h-8 w-8 rounded-lg relative bg-indigo-200 text-indigo-700'>
						<FilePlus2 className='h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
					</div>
					<h3 className='font-medium line-clamp-1'>Total product</h3>
				</div>

				<span className='text-indigo-700 text-4xl font-bold'>{products}</span>
			</div>

			<div className='bg-white rounded-xl border border-gray-200 p-6'>
				<div className='flex items-center space-x-4 mb-4'>
					<div className='flex-shrink-0 h-8 w-8 rounded-lg relative bg-indigo-200 text-indigo-700'>
						<FilePlus2 className='h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
					</div>
					<h3 className='font-medium line-clamp-1'>Total order</h3>
				</div>

				<span className='text-indigo-700 text-4xl font-bold'>{orders}</span>
			</div>
		</>
	);
};