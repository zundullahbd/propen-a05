'use client';

import { Controller, useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';

import TextWithIconButton from '@/app/components/ui/TextWithIconButton';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const PlusIcon = () => (
	<svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path d='M12 5V19M5 12H19' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

const schema = z.object({
	stars: z.coerce.number().int(),
	review: z.string().min(50).max(255),
	attitude: z.coerce.boolean(),
	speed: z.coerce.boolean(),
	communication: z.coerce.boolean(),
	outcome: z.coerce.boolean(),
	efficiency: z.coerce.boolean(),
});

const AddReview = ({ id }: { id: string }) => {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof schema>>({
		defaultValues: {
			stars: 1,
			review: '',
			attitude: false,
			speed: false,
			communication: false,
			outcome: false,
			efficiency: false,
		},
		resolver: zodResolver(schema),
	});

	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (formData: z.infer<typeof schema>) => {
		setIsLoading(true);

		try {
			await axios.post('/api/reviews/' + id, formData);
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
			<TextWithIconButton text='Leave a Review' icon={<PlusIcon />} onClick={handleModal} />

			<div className={isOpen ? 'modal modal-open' : 'modal'}>
				<div className='modal-box'>
					<h3 className='font-bold text-lg'>Give us a review</h3>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='form-control w-full'>
							<label className='label font-bold'>How would you rate the experience?</label>
							<Controller
								name='stars'
								control={control}
								render={({ field }) => (
									<div className='rating rating-lg'>
										{[...Array(5)].map((_, index) => (
											<input
												key={index}
												type='radio'
												name={field.name}
												value={index + 1}
												className='mask mask-star-2 bg-primary'
												checked={field.value === index + 1}
												onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10))}
											/>
										))}
									</div>
								)}
							/>
							<p className='text-red-500 text-sm mt-1'>{errors.stars?.message}</p>
						</div>

						<div className='form-control w-full'>
							<label className='label font-bold'>attitude</label>

							<div className='flex flex-col space-y-1'>
								<div className='flex items-center space-x-2'>
									<input
										{...register('attitude')}
										type='checkbox'
										className='checkbox checkbox-primary checkbox-sm'
									/>
									<label htmlFor='attitude'>Customer service attitude</label>
								</div>

								<div className='flex items-center space-x-2'>
									<input
										{...register('speed')}
										type='checkbox'
										className='checkbox checkbox-primary checkbox-sm'
									/>
									<label htmlFor='speed'>Speed of service</label>
								</div>

								<div className='flex items-center space-x-2'>
									<input
										{...register('communication')}
										type='checkbox'
										className='checkbox checkbox-primary checkbox-sm'
									/>
									<label htmlFor='communication'>Communication quality</label>
								</div>

								<div className='flex items-center space-x-2'>
									<input
										{...register('outcome')}
										type='checkbox'
										className='checkbox checkbox-primary checkbox-sm'
									/>
									<label htmlFor='outcome'>Outcome of the complaint</label>
								</div>

								<div className='flex items-center space-x-2'>
									<input
										{...register('efficiency')}
										type='checkbox'
										className='checkbox checkbox-primary checkbox-sm'
									/>
									<label htmlFor='efficiency'>Efficiency of the process</label>
								</div>
							</div>

							<p className='text-red-500 text-sm mt-1'>{errors.attitude?.message}</p>
						</div>

						<div className='form-control w-full'>
							<label className='label font-bold'>Share your feedback (optional)</label>
							<textarea
								{...register('review')}
								className='input input-bordered min-h-32'
								placeholder='Review'
								rows={5}
							/>
							<p className='text-red-500 text-sm mt-1'>{errors.review?.message}</p>
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

export default AddReview;