import { ArrowLeft, Check, CircleCheck } from 'lucide-react';
import React, { useEffect } from 'react';

import DeleteTickets from '../deleteTickets';
import Link from 'next/link';
import TicketClipboard from '../_components/TicketClipboard';
import TicketTile from '@/app/components/ui/TicketTile';
import UpdateTicket from '../updateTickets';
import { db } from '@/lib/prisma';

interface PageProps {
	params: {
		id: string;
	};
}

const getTicketData = async ({ id }: { id: string }) => {
	const ticket = await db.ticket.findUnique({
		where: {
			id: Number.parseInt(id, 10),
		},
		include: {
			sales: {
				include: {
					Product: {
						include: {
							brand: true,
						},
					},
				},
			},
			customer: true,
			Review: true,
		},
	});

	return ticket;
};

const Page: React.FC<PageProps> = async ({ params }) => {
	const ticket = await getTicketData({ id: params.id });
	if (!ticket) return <div>Ticket not found</div>;

	const likes = [
		{ name: 'Customer service attitude', icon: CircleCheck, enabled: ticket.Review?.attitude },
		{ name: 'Speed of service', icon: CircleCheck, enabled: ticket.Review?.speed },
		{ name: 'Communication quality', icon: CircleCheck, enabled: ticket.Review?.communication },
		{ name: 'Outcome of the complaint', icon: CircleCheck, enabled: ticket.Review?.outcome },
		{ name: 'Efficiency of the process', icon: CircleCheck, enabled: ticket.Review?.efficiency },
	];

	return (
		<>
			<div className='flex justify-start mb-4'>
				<Link className='flex items-center justify-center space-x-2' href='/tickets'>
					<ArrowLeft size={16} />
					<span>Back</span>
				</Link>
			</div>

			<div className='flex space-x-4 items-center justify-between'>
				<h1 className='text-[#344054] font-semibold text-2xl'>Ticket #{ticket?.id}</h1>

				<div className='flex items-center space-x-4'>
					<TicketClipboard id={ticket.id} />
					<UpdateTicket ticket={ticket} />
					<DeleteTickets ticket={ticket} />
				</div>
			</div>

			<div className='grid lg:grid-cols-5 gap-7 mt-4'>
				<TicketTile header='Ticket Details' className='lg:col-span-3'>
					<div className='text-[#344054] space-y-5'>
						<div className='grid grid-cols-3 gap-4'>
							<div className='text-sm'>
								<h2 className='text-gray-500 mb-1'>Ticket ID</h2>
								<p>#{ticket.id}</p>
							</div>

							<div className='text-sm'>
								<h2 className='text-gray-500 mb-1'>Title</h2>
								<p>{ticket.title}</p>
							</div>

							<div className='text-sm'>
								<h2 className='text-gray-500 mb-1'>Customer</h2>
								<p>{ticket.customer.name}</p>
							</div>

							<div className='text-sm'>
								<h2 className='text-gray-500 mb-1'>Category</h2>
								<p>{ticket.category}</p>
							</div>
						</div>
						<div className='grid grid-cols-3'>
							<div className='text-sm'>
								<h2 className='text-gray-500 mb-1'>Date Submitted</h2>
								<p>
									{ticket.createdAt.toLocaleDateString('id-ID', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</p>
							</div>
							<div className='text-sm'>
								<h2 className='text-gray-500 mb-1'>Last Updated</h2>
								<p>
									{ticket.updatedAt.toLocaleDateString('id-ID', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</p>
							</div>
						</div>
						<div className='text-sm'>
							<h2 className='text-gray-500 mb-1'>Description</h2>
							<p>{ticket.description}</p>
						</div>
					</div>
				</TicketTile>

				<TicketTile header='Product Details' className='lg:col-span-2'>
					<div className='text-[#344054] space-y-5'>
						<div className='grid grid-cols-2'>
							<div className='text-sm'>
								<h2 className='text-gray-500 mb-1'>Product Name</h2>
								<p>{ticket.sales.Product ? ticket.sales.Product.title : ''}</p>
							</div>
							<div className='text-sm'>
								<h2 className='text-gray-500 mb-1'>Product ID</h2>
								<p>{ticket.sales.Product ? ticket.sales.Product.id : ''}</p>
							</div>
						</div>
						<div className='grid grid-cols-2'>
							<div className='text-sm'>
								<h2 className='text-gray-500 mb-1'>Brand</h2>
								<p>{ticket.sales?.Product?.brand?.name}</p>
							</div>
							<div className='text-sm'>
								<h2 className='text-gray-500 mb-1'>Brand Website</h2>
								<p>{ticket.sales?.Product?.brand?.website}</p>
							</div>
						</div>
						<div className='grid grid-cols-2'>
							<div className='text-sm'>
								<h2 className='text-gray-500 mb-1'>Variant</h2>
								<p>No Variation</p>
							</div>
							<div className='text-sm'>
								<h2 className='text-gray-500 mb-1'>Purchase Date</h2>
								<p>No Date</p>
							</div>
						</div>
					</div>
				</TicketTile>

				{ticket.Review && (
					<TicketTile header='Rating & Review' className='col-span-full '>
						<div className='flex flex-row text-[#344054] space-x-32'>
							<div>
								<div className='text-sm'>
									<h2 className='text-gray-500 mb-1'>Rating</h2>
									<div className='flex space-x-1'>
										{Array.from({ length: ticket.Review.stars }).map((_, index) => (
											<svg
												key={index}
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 24 24'
												fill='currentColor'
												className='w-6 h-6 text-indigo-700'>
												<path
													fillRule='evenodd'
													d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
													clipRule='evenodd'
												/>
											</svg>
										))}
									</div>
								</div>
								<div className='text-sm mt-5'>
									<h2 className='text-gray-500 mb-1'>What they liked</h2>
									{likes
										.filter((like) => like.enabled)
										.map((like, index) => {
											const Icon = like.icon;
											return (
												<div className='flex items-center space-x-3 mb-1' key={index}>
													<Icon size={16} className='text-indigo-700 flex-none' />
													<p className='w-full whitespace-nowrap'>{like.name}</p>
												</div>
											);
										})}
								</div>
							</div>
							<div className='text-sm'>
								<h2 className='text-gray-500 mb-1'>Rating</h2>
								<p>{ticket.Review.review}</p>
							</div>
						</div>
					</TicketTile>
				)}
			</div>
		</>
	);
};

export default Page;