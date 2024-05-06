import * as React from 'react'

import { ArrowDownAZ, ArrowUpAZ, PlusIcon } from 'lucide-react'
import { CustomerGrid } from './_components/CustomerGrid'
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
					href={`/customers?page=${page}&sort=${sort === 'asc' ? 'desc' : 'asc'}`}
					className='flex items-center space-x-2 text-gray-500'>
					{sort === 'asc' ? <ArrowUpAZ size={16} /> : <ArrowDownAZ size={16} />}
					<span className='text-sm'>Name</span>
				</Link>

				<div className='flex items-center justify-end space-x-2'>
					<Link href='/customers/create'>
						<button className='text-sm bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2'>
							<span>Add Customer</span>
							<PlusIcon size={16} />
						</button>
					</Link>

					<Link href='/customers/import'>
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
				<CustomerGrid page={page} sort={sort} />
			</React.Suspense>
		</>
	)
}

export default Page

;