import Image from 'next/image';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import { db } from '@/lib/prisma';

interface BrandGridProps {
	page: number;
	sort: 'asc' | 'desc';
}

export const BrandGrid: React.FC<BrandGridProps> = async ({ page, sort }) => {
	const limit = 6;
	const offset = (page - 1) * limit;

	const brands = await db.brand.findMany({
		take: limit,
		skip: offset,
		orderBy: { name: sort },
	});

	const totalBrands = await db.brand.count();
	const totalPages = Math.ceil(totalBrands / limit);
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<>
			<div className='grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-6'>
				{brands.map((brand, index) => (
					<div
						key={index}
						className='bg-white rounded-lg  border border-gray-200 relative pb-10 overflow-hidden'>
						<div className='flex py-6 items-center justify-center border-b border-gray-200'>
							<Image
								alt='brand'
								src={`/uploads/${brand.image}`}
								width={150}
								height={50}
								className='object-contain w-40 h-12'
							/>
						</div>

						<div className='p-4 text-sm'>
							<h2 className='font-semibold mb-2'>{brand.name}</h2>
							<p className='text-gray-500 mb-2 line-clamp-3'>{brand.description}</p>
							<a href={brand.website} target='_blank' className='text-sky-600 hover:underline'>
								{brand.website}
							</a>
						</div>

						<Link href={`/brands/${brand.id}`} className='absolute bottom-4 left-4 right-0'>
							<div className='text-sm flex items-center space-x-2 text-blue-600 hover:underline'>
								<span>More Information</span>
								<MoveRight size={16} />
							</div>
						</Link>
					</div>
				))}
			</div>

			<div className='flex justify-center space-x-2 mb-6'>
				{pages.map((p) => (
					<Link key={p} href={`/brands?page=${p}&sort=${sort}`}>
						<button
							className={cn(
								'h-8 w-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-200 text-sm',
								p === page && 'bg-gray-200'
							)}>
							{p}
						</button>
					</Link>
				))}
			</div>
		</>
	);
};