import * as React from 'react'

import {ArrowDownAZ, ArrowUpAZ, PlusIcon, SearchIcon} from 'lucide-react'
import { SalesGrid } from './_components/SalesGrid'
import Link from 'next/link'

interface PageProps {
	searchParams: {
		page: string
		sort: string
	}
}

const Page: React.FC<PageProps> = ({ searchParams }) => {
	const page = Number.parseInt(searchParams.page, 10) || 1
	const sort = searchParams.sort === 'asc' ? 'asc' : 'desc'
	const serialized = JSON.stringify({ page, sort })

	return (
		<>
			<div className='flex items-center justify-between mb-6'>
				<Link
					href={`/sales?page=${page}&sort=${sort === 'asc' ? 'desc' : 'asc'}`}
					className='flex items-center space-x-2 text-gray-500'>
					{sort === 'asc' ? <ArrowUpAZ size={16} /> : <ArrowDownAZ size={16} />}
					<span className='text-sm'>Name</span>
				</Link>

				{/* <div className='flex items-center w-full max-w-xs relative'>
					<SearchIcon className='h-5 w-20 text-gray-400 absolute left-3' aria-hidden='true' />
					<input
						type='text'
						placeholder='Search sales...'
						className='block w-full rounded-md border-0 py-1.5 pl-14 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
					/>
				</div> */}

				<div className='grow relative rounded-md'>
					<div className='pointer-events-none absolute inset-y-0 left-10 flex items-center pl-3'>
						<SearchIcon className='h-5 w-20 text-gray-400' aria-hidden='true' />
					</div>
					<input
						placeholder='Search'
						className='block w-5/6 rounded-md border-0 py-1.5 pl-10 pr-6 mx-auto text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 bg-white'
					/>
				</div>

				<div className='flex items-center justify-end space-x-2'>
					<Link href='/sales/create'>
						<button className='text-sm bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2'>
							<span>Add Product Sales</span>
							<PlusIcon size={16} />
						</button>
					</Link>

					<Link href='/sales/import'>
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
					<div className='w-full h-[80vh] flex justify-center items-center'>
						<span className='loading loading-bars text-indigo-700'></span>
					</div>
				}>
				<SalesGrid page={page} sort={sort} />
			</React.Suspense>
		</>
	)
}

export default Page

;