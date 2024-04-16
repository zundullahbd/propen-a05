import * as React from 'react';

import { ArrowLeft, Facebook, Instagram, Link2, Pencil, Phone, Trash, Twitter } from 'lucide-react';

import DeleteForm from '../_components/DeleteForm';
import Image from 'next/image';
import Link from 'next/link';
import { categories } from '../_components/constant';
import { db } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

interface PageProps {
	params: {
		id: string;
	};
}

const Page: React.FC<PageProps> = async ({ params }) => {
	const { id } = params;
	const brand = await db.brand.findUnique({
		where: {
			id: Number.parseInt(id, 10),
		},
	});

	if (!brand) return <div>Brand not found</div>;

	return (
		<>
			<div className='flex justify-start mb-4'>
				<Link className='flex items-center justify-center space-x-2' href='/brands'>
					<ArrowLeft size={16} />
					<span>Back</span>
				</Link>
			</div>

			<div className='mb-4 flex justify-between items-center'>
				<h1 className='font-semibold text-2xl'>{brand.name}</h1>

				<div className='flex items-center justify-end space-x-2'>
					<Link
						href={`/brands/${brand.id}/edit`}
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
					<h2 className='font-semibold mb-4'>Brand Details</h2>

					<div className='space-y-6'>
						{brand.image && (
							<div className='space-y-2'>
								<h3 className='text-gray-500 text-sm'>Logo</h3>
								<Image
									alt='brand'
									src={`/uploads/${brand.image}`}
									width={150}
									height={50}
									className='object-contain w-40 h-12'
								/>
							</div>
						)}

						<div className='space-y-2'>
							<h3 className='text-gray-500 text-sm'>Description</h3>
							<p className='text-sm text-muted-foreground'>{brand.description}</p>
						</div>

						<div className='space-y-2'>
							<h3 className='text-gray-500 text-sm'>Product Range</h3>
							<div className='flex flex-wrap gap-2'>
								{categories.map((category) => (
									<span
										key={category.id}
										className='border border-gray-200 rounded-full px-2 py-1 text-sm'>
										{category.label}
									</span>
								))}
							</div>
						</div>

						<div className='space-y-2'>
							<h3 className='text-gray-500 text-sm'>Sales Person</h3>
							<p className='text-sm text-muted-foreground'>TBD</p>
						</div>
					</div>
				</div>

				<div className='p-6 bg-white rounded-lg '>
					<h2 className='font-semibold mb-4'>Contact Information</h2>

					<div className='space-y-6'>
						<div className='space-y-2'>
							<h3 className='text-gray-500 text-sm'>Contact</h3>
							<div className='flex items-center space-x-2'>
								<Link2 size={16} />
								<Link href={brand.website} className='text-sm text-sky-500'>
									{brand.website}
								</Link>
							</div>

							<div className='flex items-center space-x-2'>
								<Phone size={16} />
								<span className='text-sm text-gray-500'>{brand.phone}</span>
							</div>
						</div>

						<div className='space-y-2'>
							<h3 className='text-gray-500 text-sm'>Service Center</h3>
							<div className='flex items-center space-x-2'>
								<Link2 size={16} />
								<Link href={brand.service ? brand.service : '#'} className='text-sm text-sky-500'>
									{brand.service}
								</Link>
							</div>
						</div>

						<div className='space-y-2'>
							<h3 className='text-gray-500 text-sm'>Social Media</h3>
							<div className='flex items-center space-x-2'>
								<Facebook size={16} />
								<Link href={brand.facebook ? brand.facebook : '#'} className='text-sm text-sky-500'>
									{brand.facebook}
								</Link>
							</div>
							<div className='flex items-center space-x-2'>
								<Instagram size={16} />
								<Link href={brand.instagram ? brand.instagram : '#'} className='text-sm text-sky-500'>
									{brand.instagram}
								</Link>
							</div>
							<div className='flex items-center space-x-2'>
								<Twitter size={16} />
								<Link href={brand.twitter ? brand.twitter : '#'} className='text-sm text-sky-500'>
									{brand.twitter}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;