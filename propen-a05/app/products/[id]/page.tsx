import * as React from 'react';

import { ArrowLeft, Facebook, Instagram, Link2, Pencil, Phone, Trash, Twitter } from 'lucide-react';

import DeleteForm from '../_components/DeleteForm';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

interface PageProps {
	params: {
		id: number;
	};
}

const Page: React.FC<PageProps> = async ({ params }) => {
	const { id } = params;
	const product = await db.product.findUnique({
		where: {
			id: id,
		},
	});

	if (!product) return <div>No item found</div>;

	return (
		<>
			<div className='flex justify-start mb-4'>
				<Link className='flex items-center justify-center space-x-2' href='/products'>
					<ArrowLeft size={16} />
					<span>Back</span>
				</Link>
			</div>

			<div className='mb-4 flex justify-between items-center'>
				<h1 className='font-semibold text-2xl'>{product.title}</h1>

				<div className='flex items-center justify-end space-x-2'>
					<Link
						href={`/products/${product.id}/edit`}
						className='text-sm text-white bg-indigo-700 py-2 px-4 rounded-lg flex items-center justify-center space-x-2'>
						<span>Edit</span>
						<Pencil size={16} />
					</Link>

					<React.Suspense fallback={null}>
						<DeleteForm id={id} />
					</React.Suspense>
				</div>
			</div>

			<div className='grid lg:grid-cols-2 gap-6'>
				<div className='p-6 bg-white rounded-lg '>
					<h2 className='font-semibold mb-4'>Details</h2>

					
				</div>

				
			</div>
		</>
	);
};

export default Page;
