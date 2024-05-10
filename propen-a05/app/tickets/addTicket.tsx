'use client';

import { Controller, useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { categoryOptions, statusOptions } from '@/lib/constants';

import TextWithIconButton from '@/app/components/ui/TextWithIconButton';
import schema from '@/schemas/ticketSchema';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const PlusIcon = () => (
	<svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path d='M12 5V19M5 12H19' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

const AddTicket = () => {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<z.infer<typeof schema>>({
		defaultValues: {
			category: 'KOMPLAIN',
			status: 'SUBMITTED',
		},
		resolver: zodResolver(schema),
	});

	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (formData: z.infer<typeof schema>) => {
		setIsLoading(true);

		try {
			await axios.post('/api/tickets', formData);
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
			<TextWithIconButton text='Add New' icon={<PlusIcon />} onClick={handleModal} />

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
								placeholder='Customer ID'
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
								<button type='submit' className='btn btn-primary'>
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

export default AddTicket;