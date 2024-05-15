'use client';

import axios, { AxiosError } from 'axios';

import PrimaryButton from '../components/ui/PrimaryButton';
import type { Ticket } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteTickets = ({ ticket }: { ticket: Ticket }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const handleDelete = async (ticketId: string) => {
		setIsLoading(true);

		try {
			await axios.delete(`/api/tickets/${ticketId}`);
			router.refresh();
			setIsOpen(false);
		} catch (error: any) {
			if (error instanceof AxiosError) alert(error.response?.data.message);
			else alert(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div>
			<PrimaryButton onClick={() => setIsOpen(true)} text='Delete Ticket' className='text-sm bg-red-500' />

			<div className={isOpen ? 'modal modal-open' : 'modal'}>
				<div className='modal-box'>
					<h3 className='font-bold text-lg'>Are sure to delete {ticket.title}?</h3>

					<div className='modal-action'>
						<button type='button' className='btn' onClick={handleModal}>
							No
						</button>
						{!isLoading ? (
							<button type='button' onClick={() => handleDelete(ticket.id)} className='btn btn-primary'>
								Yes
							</button>
						) : (
							<button type='button' className='btn loading'>
								Deleting...
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteTickets;