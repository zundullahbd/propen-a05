'use client';

import * as React from 'react';

import { ArrowLeft, ImageUp } from 'lucide-react';
import { FormState, createBrand } from '../_action/action';
import { LazyMotion, domAnimation, m } from 'framer-motion';

import Image from 'next/image';
import { Input } from '@/app/components/ui/input';
import { LabelWithError } from './LabelWithError';
import { Textarea } from '@/app/components/ui/TextArea';
import { categories } from './constant';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';

const Form = () => {
	const START_PAGE = 0;
	const FINISH_PAGE = 2;

	const router = useRouter();
	const ref = React.useRef<HTMLInputElement>(null);
	const [step, setStep] = React.useState(0);
	const [file, setFile] = React.useState<File | null>(null);

	const variants = {
		animate: (count: number) => ({
			height: count == 0 ? '27rem' : count == 1 ? '32rem' : '24rem',
			opacity: 1,
			transition: {
				duration: 0.3,
			},
		}),
		hidden: { opacity: 0, height: '28rem' },
	};

	const [formState, formAction] = useFormState<FormState, FormData>(createBrand, {
		type: 'idle',
		errors: undefined,
	});

	const formRef = React.useRef<HTMLFormElement>(null);

	React.useEffect(() => {
		if (formState.type === 'success') {
			toast.success('Create Brand', {
				description: 'Brand has been created successfully',
			});
			router.back();
		}
		if (formState.type === 'error') setStep(0);
	}, [router, formState]);

	const handleUpload = () => {
		ref.current?.click();
	};

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) setFile(e.target.files[0]);
	};

	return (
		<LazyMotion features={domAnimation}>
			<div className='p-4 border-b border-gray-200'>
				{step === START_PAGE ? (
					<h1>Add a new brand</h1>
				) : (
					<button className='flex items-center justify-center space-x-2' onClick={() => setStep(step - 1)}>
						<ArrowLeft size={16} />
						<span>Back</span>
					</button>
				)}
			</div>

			<m.form
				ref={formRef}
				action={formAction}
				custom={step}
				initial='hidden'
				variants={variants}
				animate='animate'
				className='flex flex-col p-4'>
				<m.div
					variants={{
						show: { opacity: 1 },
						hidden: { opacity: 0 },
					}}
					transition={{ delay: 0.3 }}
					animate={step === 0 ? 'show' : 'hidden'}
					className={cn(step === 0 ? 'block' : 'hidden')}>
					<div className='mb-2'>
						<LabelWithError htmlFor='name' error={formState.errors?.name}>
							Name
						</LabelWithError>
						<Input name='name' type='text' placeholder='Brand name' />
					</div>

					<div className='mb-2'>
						<LabelWithError htmlFor='description' error={formState.errors?.description}>
							Description
						</LabelWithError>
						<Textarea name='description' placeholder='Brand description' className='resize-none' />
					</div>

					<div className='mb-4'>
						<LabelWithError htmlFor='categories' error={formState.errors?.categories}>
							Product Range
						</LabelWithError>
						<div className='grid grid-cols-2 gap-2'>
							{categories.map((category) => (
								<div key={category.id} className='flex items-center space-x-2'>
									<input
										type='checkbox'
										value={category.id}
										name={category.name}
										className='h-4 w-4 rounded-sm form-checkbox text-indigo-600 border-gray-300 focus:ring-indigo-600
                                        focus:ring-1 focus:ring-offset-2 focus:ring-offset-background'
									/>
									<span className='text-sm text-gray-500'>{category.label}</span>
								</div>
							))}
						</div>
					</div>

					<button
						type='button'
						onClick={() => setStep((prev) => prev + 1)}
						className='text-sm bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 w-full'>
						<span>Next</span>
					</button>
				</m.div>

				<m.div
					variants={{
						show: { opacity: 1 },
						hidden: { opacity: 0 },
					}}
					transition={{ delay: 0.3 }}
					animate={step === 1 ? 'show' : 'hidden'}
					className={cn(step === 1 ? 'block' : 'hidden')}>
					<div className='mb-2'>
						<LabelWithError htmlFor='phone' error={formState.errors?.phone}>
							Phone
						</LabelWithError>
						<Input name='phone' type='text' placeholder='Brand phone' />
					</div>

					<div className='mb-2'>
						<LabelWithError htmlFor='website' error={formState.errors?.website}>
							Website
						</LabelWithError>
						<Input name='website' type='text' placeholder='Brand website' />
					</div>

					<div className='mb-2'>
						<LabelWithError htmlFor='service' error={formState.errors?.service}>
							Service Center service
						</LabelWithError>
						<Input name='service' type='text' placeholder='Service center link' />
					</div>

					<div className='mb-2'>
						<LabelWithError htmlFor='facebook' error={formState.errors?.facebook}>
							Facebook
						</LabelWithError>
						<Input name='facebook' type='text' placeholder='Brand facebook' />
					</div>

					<div className='mb-2'>
						<LabelWithError htmlFor='instagram' error={formState.errors?.instagram}>
							Instagram
						</LabelWithError>
						<Input name='instagram' type='text' placeholder='Brand instagram' />
					</div>

					<div className='mb-4'>
						<LabelWithError htmlFor='twitter' error={formState.errors?.twitter}>
							Twitter
						</LabelWithError>
						<Input name='twitter' type='text' placeholder='Brand twitter' />
					</div>

					<button
						type='button'
						onClick={() => setStep((prev) => prev + 1)}
						className='text-sm bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 w-full'>
						<span>Next</span>
					</button>
				</m.div>

				<m.div
					variants={{
						show: { opacity: 1 },
						hidden: { opacity: 0 },
					}}
					transition={{ delay: 0.3 }}
					animate={step === FINISH_PAGE ? 'show' : 'hidden'}
					className={cn(step === FINISH_PAGE ? 'block' : 'hidden')}>
					<div className='mb-4'>
						<LabelWithError htmlFor='image' error={formState.errors?.image}>
							Logo
						</LabelWithError>
						<div
							onClick={handleUpload}
							className={cn(
								'border border-gray-200 rounded-lg flex items-center justify-center aspect-video  cursor-pointer relative'
							)}>
							<Input
								name='image'
								type='file'
								className='sr-only'
								ref={ref}
								onChange={onFileChange}
								accept='.jpg, .jpeg, .png, .svg'
							/>
							{file ? (
								<>
									<Image
										src={URL.createObjectURL(file)}
										alt='image'
										width={400}
										height={400}
										className='rounded-lg w-full h-full object-cover'
									/>
								</>
							) : (
								<div className='flex items-center space-x-2 text-gray-500'>
									<ImageUp size={24} />
									<span className='text-sm'>Upload file</span>
								</div>
							)}
						</div>
					</div>

					<button className='text-sm bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 w-full'>
						<span>Submit</span>
					</button>
				</m.div>
			</m.form>
		</LazyMotion>
	);
};

export default Form;