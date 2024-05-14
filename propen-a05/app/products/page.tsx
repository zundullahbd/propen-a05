import * as React from 'react';
import { ArrowDownAZ, ArrowUpAZ, PlusIcon, SearchIcon } from 'lucide-react';
import { ProductGrid } from './_components/ProductGrid';
import Link from 'next/link';
import Search from './_components/Search';

interface PageProps {
	searchParams: {
		page: string;
		sort: string;
		limit: string;
		search: string;
	};
}

const Page: React.FC<PageProps> = ({ searchParams }) => {
	const { page, sort, limit, search } = searchParams;
	const currentPage = Number.parseInt(page, 10) || 1;
	const currentSort = sort === 'asc'? 'asc' : 'desc';
	const currentLimit = Number.parseInt(limit, 10) || 10;
	const currentSearch = search || undefined;

	const serialized = JSON.stringify({ page: currentPage, sort: currentSort });

	return (
		<>
			<div className='flex items-center justify-between mb-6'>
				<Link
					href={`/products?page=${currentPage}&sort=${currentSort === 'asc'? 'desc' : 'asc'}`}
					className='flex items-center space-x-2 text-gray-500'
				>
					{currentSort === 'asc'? <ArrowUpAZ size={16} /> : <ArrowDownAZ size={16} />}
					<span className='text-sm'>Name</span>
				</Link>

				<div className='grow'>
					<Search search={currentSearch} />
				</div>

				<div className='flex items-center justify-end space-x-2'>
					<Link href='/products/create'>
						<button className='text-sm bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2'>
							<span>Add Product</span>
							<PlusIcon size={16} />
						</button>
					</Link>

					<Link href='/products/import'>
						<button className='text-sm bg-white border border-indigo-700 text-indigo-700 font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2'>
							<span>Import</span>
							<PlusIcon size={16} />
						</button>
					</Link>
				</div>
			</div>

			<React.Suspense
				key={serialized}
				fallback={
					<div className='w-full h-[80vh] flex flex-col justify-end items-center'>
						<span className='loading loading-bars text-indigo-700'></span>
					</div>
				}
			>
				<ProductGrid page={currentPage} sort={currentSort} />
			</React.Suspense>
		</>
	);
};

export default Page;