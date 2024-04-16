import * as React from 'react';

export default async function Loading(): Promise<React.JSX.Element> {
	return (
		<div className='absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
			<span className='loading loading-bars text-white'></span>
		</div>
	);
}