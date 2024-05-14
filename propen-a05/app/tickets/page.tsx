import AddTicket from './addTicket';
import Link from 'next/link';
import Table from '../components/table/Table';
import { db } from '@/lib/prisma';
import { formatDate } from '../libs/util';

const getTickets = async () => {
	return await db.ticket.findMany({
		include: {
			sales: {
				include: {
					Product: true,
				},
			},
		},
	});
};

const Ticket = async () => {
	const tickets = await getTickets();
	const tableHeaders = ['Title', 'Last Updated', 'Product', 'Category', 'Status', 'Actions'];

	return (
		<div>
			<div className='mb-4'>
				<AddTicket />
			</div>

			<Table header={tableHeaders}>
				{tickets.map((tickets, index) => (
					<tr key={index} className='[&>td]:p-6'>
						<td>{tickets.title}</td>
						<td>{formatDate(tickets.updatedAt)}</td>
						<td>{tickets.sales.Product ? tickets.sales.Product.title : ''}</td>
						<td>{tickets.category}</td>
						<td>
							<span className='py-2 px-4 border border-indigo-700 text-indigo-700 rounded-full text-sm'>
								{tickets.status}
							</span>
						</td>
						<td>
							<Link
								href={`/tickets/${tickets.id}`}
								className='py-2 px-4 text-sm bg-indigo-700 text-white font-medium rounded-lg'>
								<span>Details</span>
							</Link>
						</td>
					</tr>
				))}
			</Table>
		</div>
	);
};

export default Ticket;