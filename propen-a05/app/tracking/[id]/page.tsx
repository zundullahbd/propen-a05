import * as React from 'react';
import AddReview from './AddReview';
import Image from 'next/image';
import Table from '@/app/components/table/Table';
import { cn } from '@/lib/utils';
import { db } from '@/lib/prisma';
import { ticketSteps } from '@/lib/constants';

interface PageProps {
	params: {
		id: string;
	};
}

const Line = ({ className }: { className?: string }) => {
	return <div className={cn('h-0.5 w-full bg-gray-200', className)}></div>;
};

const getTicket = async (id: string) => {
	return await db.ticket.findUnique({
		where: {
			id,
		},
		include: {
			sales: {
				include: {
					Product: true,
				},
			},
			Review: true,
		},
	});
};

export default async function Page({ params }: PageProps): Promise<React.JSX.Element> {
	const tableHeaders = ['No', 'ID', 'Last Updated', 'Product', 'Category', 'Description', 'Status'];

	const ticket = await getTicket(params.id);
	if (!ticket) return <div>Ticket not found</div>;

	const current = Math.max(
		ticketSteps.findIndex((step) => step.value === ticket.status),
		0
	);

	return (
		<>
			<div className='mb-8'>
				<div className='flex space-x-4 items-center py-8'>
					{ticketSteps.map((step, index) => {
						const Icon = step.icon;

						return (
							<>
								<div
									key={index}
									className={cn(
										'flex-none w-14 aspect-square rounded-full border-2  flex items-center justify-center border-gray-200 text-gray-200 mb-4 relative',
										index <= current && 'text-indigo-700 border-indigo-700'
									)}>
									<Icon size={24} />

									<div className='absolute top-full left-1/2 transform -translate-x-1/2 mt-4'>
										<span className='text-sm font-medium whitespace-nowrap'>{step.label}</span>
									</div>
								</div>

								{ticketSteps.indexOf(step) !== ticketSteps.length - 1 && (
									<Line className={cn(index < current && 'bg-indigo-700')} />
								)}
							</>
						);
					})}
				</div>
			</div>

			<Table header={tableHeaders} className='mb-2'>
				<tr className='[&>td]:p-6'>
					<td>1</td>
					<td>{ticket.id}</td>
					<td>{ticket.updatedAt.toString()}</td>
					<td>{ticket.sales?.Product?.title}</td>
					<td>{ticket.category}</td>
					<td>
						<p className='text-sm w-full max-w-40 line-clamp-2'>{ticket.description}</p>
					</td>
					<td>
						<span className='py-2 px-4 border border-indigo-700 text-indigo-700 rounded-full text-sm'>
							{ticket.status}
						</span>
					</td>
				</tr>
			</Table>

			<div className='flex flex-col items-center justify-center'>
				<Image
					src='/review-illustration.svg'
					alt='review-Illustration'
					width={300}
					height={300}
					className='mb-8'
				/>

				{!ticket.Review && ticket.status === 'CLOSED' && <AddReview id={ticket.id.toString()} />}
			</div>
		</>
	);
}