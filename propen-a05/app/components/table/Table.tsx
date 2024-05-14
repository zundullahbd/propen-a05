import React from 'react';
import { cn } from '@/lib/utils';

interface TableProps {
	header: string[];
	children: React.TableHTMLAttributes<HTMLTableElement>['children'];
	className?: string;
}

const Table = ({ header, children, className }: TableProps) => {
	return (
		<div className={cn('w-full rounded-xl border border-gray-200 overflow-auto', className)}>
			<table className='w-full table-auto bg-white'>
				<thead>
					<tr>
						{header.map((item, index) => (
							<th key={index} className='p-6 text-start font-semibold text-sm'>
								{item}
							</th>
						))}
					</tr>
				</thead>
				<tbody className='[&>tr]:border-t [&>tr]:border-gray-200 text-sm'>{children}</tbody>
			</table>
		</div>
	);
};

export default Table;