'use client';

import { Controller, useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { categoryOptions, statusOptions } from '@/lib/constants';

import PrimaryButton from '../components/ui/PrimaryButton';
import type { Ticket } from '@prisma/client';
import schema from '@/schemas/ticketSchema';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const UpdateTicket = ({ ticket }: { ticket: Ticket }) => {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof schema>>({
		defaultValues: {
			title: ticket.title,
			customerId: Number(ticket.customerId),
			salesId: Number(ticket.salesId),
			category: ticket.category,
			description: ticket.description,
			status: ticket.status,
		},
		resolver: zodResolver(schema),
	});

	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (formData: z.infer<typeof schema>) => {
		setIsLoading(true);
		

		try {
			await axios.patch(`/api/tickets/${ticket.id}`, formData);
			setIsOpen(false);
			window.location.reload();
		} catch (error: any) {
			if (error instanceof AxiosError) toast.error(error.response?.data.message);
			else toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div>
			<PrimaryButton onClick={() => setIsOpen(true)} text='Edit Ticket' className='text-sm' />

			<div className={isOpen ? 'modal modal-open' : 'modal'}>
				<div className='modal-box'>
					<h3 className='font-bold text-lg'>Add New Ticket</h3>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='form-control w-full'>
							<label className='label font-bold'>Ticket title</label>
							<input
								type='text'
								{...register('title')}
								className='input input-bordered'
								placeholder='Ticket title'
							/>
							<p className='text-red-500 text-sm mt-1'>{errors.title?.message}</p>
						</div>

						<div className='form-control w-full'>
							<label className='label font-bold'>Customer ID</label>
							<input
								type='text'
								{...register('customerId')}
								className='input input-bordered'
								placeholder='Customder ID'
								disabled
							/>
							<p className='text-red-500 text-sm mt-1'>{errors.customerId?.message}</p>
						</div>

						<div className='form-control w-full'>
							<label className='label font-bold'>Order ID</label>
							<input
								type='text'
								{...register('salesId')}
								className='input input-bordered'
								placeholder='Order ID'
							/>
							<p className='text-red-500 text-sm mt-1'>{errors.salesId?.message}</p>
						</div>

						<div className='form-control w-full'>
							<label className='label font-bold'>Category</label>
							<Controller
								name='category'
								control={control}
								render={({ field }) => (
									<select {...field} className='select select-bordered'>
										<option value='' disabled>
											Select Category
										</option>
										{categoryOptions.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
								)}
							/>
							<p className='text-red-500 text-sm mt-1'>{errors.category?.message}</p>
						</div>

						<div className='form-control w-full'>
							<label className='label font-bold'>Description</label>
							<textarea
								{...register('description')}
								className='textarea textarea-lg textarea-bordered'
								placeholder='Description'
							/>
							<p className='text-red-500 text-sm mt-1'>{errors.description?.message}</p>
						</div>

						<div className='form-control w-full'>
							<label className='label font-bold'>Status</label>
							<Controller
								name='status'
								control={control}
								render={({ field }) => (
									<select {...field} className='select select-bordered'>
										<option value='' disabled>
											Select Status
										</option>
										{statusOptions.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
								)}
							/>
							<p className='text-red-500 text-sm mt-1'>{errors.status?.message}</p>
						</div>

						<div className='modal-action'>
							<button type='button' className='btn' onClick={handleModal}>
								Close
							</button>
							{!isLoading ? (
								<button type='submit' className='btn btn-primary text-white'>
									Save
								</button>
							) : (
								<button type='button' className='btn loading'>
									Saving...
								</button>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UpdateTicket;