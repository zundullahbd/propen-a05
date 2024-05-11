import * as React from 'react';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function Loading(): Promise<React.JSX.Element> {
	return (
		<>
			<div className='flex justify-start mb-4'>
				<Link className='flex items-center justify-center space-x-2' href='/products'>
					<ArrowLeft size={16} />
					<span>Back</span>
				</Link>
			</div>

			<div className='mb-4 flex justify-start items-center'>
				<div className='w-40 h-9 bg-gray-100 animate-pulse rounded-lg'></div>
			</div>

			<div className='grid lg:grid-cols-2 gap-6'>
				<div className='p-6 bg-white rounded-lg '>
					<div className='w-40 h-6 bg-gray-100 animate-pulse rounded-lg mb-4'></div>

					<div className='space-y-6'>
						<div className='space-y-2'>
							<div className='w-40 h-4 bg-gray-100 animate-pulse rounded-lg'></div>
							<div className='w-full h-4 bg-gray-100 animate-pulse rounded-lg'></div>
							<div className='w-full h-4 bg-gray-100 animate-pulse rounded-lg'></div>
							<div className='w-2/3 h-4 bg-gray-100 animate-pulse rounded-lg'></div>
						</div>

						<div className='space-y-2'>
							<div className='w-40 h-4 bg-gray-100 animate-pulse rounded-lg'></div>
							<div className='w-full h-4 bg-gray-100 animate-pulse rounded-lg'></div>
						</div>

						<div className='space-y-2'>
							<div className='w-40 h-4 bg-gray-100 animate-pulse rounded-lg'></div>
							<div className='w-full h-4 bg-gray-100 animate-pulse rounded-lg'></div>
						</div>
					</div>
				</div>
				<div className='p-6 bg-white rounded-lg '>
					<div className='w-40 h-6 bg-gray-100 animate-pulse rounded-lg mb-4'></div>

					<div className='space-y-6'>
						<div className='space-y-2'>
							<div className='w-40 h-4 bg-gray-100 animate-pulse rounded-lg'></div>
							<div className='w-2/3 h-4 bg-gray-100 animate-pulse rounded-lg'></div>
							<div className='w-2/3 h-4 bg-gray-100 animate-pulse rounded-lg'></div>
						</div>

						<div className='space-y-2'>
							<div className='w-40 h-4 bg-gray-100 animate-pulse rounded-lg'></div>
							<div className='w-2/3 h-4 bg-gray-100 animate-pulse rounded-lg'></div>
						</div>

						<div className='space-y-2'>
							<div className='w-40 h-4 bg-gray-100 animate-pulse rounded-lg'></div>
							<div className='w-2/3 h-4 bg-gray-100 animate-pulse rounded-lg'></div>
							<div className='w-2/3 h-4 bg-gray-100 animate-pulse rounded-lg'></div>
							<div className='w-2/3 h-4 bg-gray-100 animate-pulse rounded-lg'></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
