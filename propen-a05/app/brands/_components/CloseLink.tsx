'use client';

import * as React from 'react';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface CloseLinkProps extends React.HTMLAttributes<HTMLButtonElement> {
	//
}

export default function CloseLink({ className, ...props }: CloseLinkProps) {
	const router = useRouter();

	return (
		<button
			{...props}
			onClick={() => router.back()}
			className={cn(
				'text-sm hover:bg-gray-200 text-gray-500 h-6 w-6 flex items-center justify-center rounded-md',
				className
			)}>
			<X size={16} />
		</button>
	);
}