import React from 'react';
import { cn } from '@/lib/utils';

interface TicketTileProps {
	header: String;
	children: React.ReactNode;
	className?: string;
}

const TicketTile = ({ header, children, className }: TicketTileProps) => {
	return (
		<div className={cn('bg-white rounded-lg p-8 border border-gray-200', className)}>
			<h1 className='font-semibold text-gray-700 mb-4'>{header}</h1>
			{children}
		</div>
	);
};

export default TicketTile;