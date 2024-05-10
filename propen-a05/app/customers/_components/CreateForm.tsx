'use client';

import * as React from 'react';

import { ArrowLeft, ImageUp } from 'lucide-react';
import { FormState, createCustomer } from '../_actions/action';
import { LazyMotion, domAnimation, m } from 'framer-motion';

import Image from 'next/image';
import { Input } from '@/app/components/ui/input';
import { LabelWithError } from './LabelWithError';
import { Textarea } from '@/app/components/ui/TextArea';
import { cn } from '@/lib/utils';
import { toast } from 'react-hot-toast';
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
			height: count == 0 ? '48rem' : count == 1 ? '32rem' : '24rem',
			opacity: 1,
			transition: {
				duration: 0.3,
			},
		}),
		hidden: { opacity: 0, height: '28rem' },
	};

	const [formState, formAction] = useFormState<FormState, FormData>(createCustomer, {
		type: 'idle',
		errors: undefined,
	});

	const formRef = React.useRef<HTMLFormElement>(null);

	React.useEffect(() => {
		if (formState.type === 'success') {
			toast.custom((t) => (
                <div
                  className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                  } max-w-md w-full bg-green-100 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-green-600 ring-opacity-100`}
                >
                  <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="success.png"
                          alt=""
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-green-800">
                          Success!
                        </p>
                        <p className="mt-1 text-sm text-green-800">
                          Customer has been created successfully
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-l">
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ));
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
					<h1>Add a new customer</h1>
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
						<LabelWithError htmlFor='outlet' error={formState.errors?.outlet}>
							Outlet
						</LabelWithError>
						<Input name='outlet' type='text' placeholder='Customer outlet' />
					</div>

					<div className='mb-2'>
						<LabelWithError htmlFor='number' error={formState.errors?.number}>
							Number
						</LabelWithError>
						<Input name='number' type='text' placeholder='Customer number' />
					</div>

					<div className='mb-2'>
						<LabelWithError htmlFor='name' error={formState.errors?.name}>
							Name
						</LabelWithError>
						<Input name='name' type='text' placeholder='Customer name' />
					</div>

					<div className='mb-2'>
						<LabelWithError htmlFor='code' error={formState.errors?.code}>
							Code
						</LabelWithError>
						<Input name='code' type='text' placeholder='Customer code' />
					</div>

					<div className='mb-4'>
						<LabelWithError htmlFor='referenceNumber' error={formState.errors?.referenceNumber}>
							Reference Number
						</LabelWithError>
						<Input name='referenceNumber' type='text' placeholder='Reference Number' />
					</div>

                    <div className='mb-4'>
						<LabelWithError htmlFor='date' error={formState.errors?.date}>
							Date
						</LabelWithError>
						<Input name='date' type='date' placeholder='Date' />
					</div>

                    <div className='mb-4'>
						<LabelWithError htmlFor='createdTime' error={formState.errors?.createdTime}>
							Created Time
						</LabelWithError>
						<Input name='createdTime' type='text' placeholder='Created Time' />
					</div>

                    <div className='mb-4'>
						<LabelWithError htmlFor='due' error={formState.errors?.due}>
							Due
						</LabelWithError>
						<Input name='due' type='text' placeholder='Due' />
					</div>

                    <div className='mb-4'>
						    Amount
						<Input name='amount' type='number' placeholder='Amount' />
					</div>

                    <div className='mb-4'>
						<LabelWithError htmlFor='payment' error={formState.errors?.payment}>
							Payment
						</LabelWithError>
						<Input name='payment' type='text' placeholder='Payment' />
					</div>

                    <div className='mb-4'>
						<LabelWithError htmlFor='fulfillment' error={formState.errors?.fulfillment}>
							Fulfillment
						</LabelWithError>
						<Input name='fulfillment' type='text' placeholder='Fulfillment' />
					</div>
				</m.div>
					<button className='text-sm bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 w-full'>
						<span>Submit</span>
					</button>
				
			</m.form>
		</LazyMotion>
	);
};

export default Form;
