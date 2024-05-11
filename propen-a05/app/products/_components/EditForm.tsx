'use client'

import * as React from 'react'

import { ArrowLeft, ImageUp } from 'lucide-react'
import { FormState, updateProduct } from '../_actions/action'
import { LazyMotion, domAnimation, m } from 'framer-motion'

import type { Product } from '@prisma/client'
import Image from 'next/image'
import { Input } from '@/app/components/ui/input'
import { LabelWithError } from './LabelWithError'
import { Textarea } from '@/app/components/ui/TextArea'
import { cn } from '@/lib/utils'
import { toast } from 'react-hot-toast';
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'

interface FormProps extends Product {
	//
}

const Form: React.FC<FormProps> = ({
	id,
	title,
	price,
	brandName,

}) => {
	const START_PAGE = 0
	const FINISH_PAGE = 2

	const router = useRouter()
	const ref = React.useRef<HTMLInputElement>(null)
	const [step, setStep] = React.useState(0)
	const [file, setFile] = React.useState<File | null>(null)

	const formRef = React.useRef<HTMLFormElement>(null)
	const [formState, formAction] = useFormState<FormState, FormData>(updateProduct, {
		type: 'idle',
		errors: undefined,
	})

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
                          alt="success"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-green-800">
                          Success!
                        </p>
                        <p className="mt-1 text-sm text-green-800">
                          Item has been updated successfully
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
			router.back()
		}
		if (formState.type === 'error') setStep(0)
	}, [router, formState])

	const handleUpload = () => {
		ref.current?.click()
	}

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) setFile(e.target.files[0])
	}

	const variants = {
		animate: (count: number) => ({
			height: count == 0 ? '48rem' : count == 1 ? '32rem' : '24rem',
			opacity: 1,
			transition: {
				duration: 0.3,
			},
		}),
		hidden: { opacity: 0, height: '28rem' },
	}

	return (
		<LazyMotion features={domAnimation}>
			<div className='p-4 border-b border-gray-200'>
				{step === START_PAGE ? (
					<h1>Edit item</h1>
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
				<input type='hidden' name='id' value={id} />

				<m.div
					variants={{
						show: { opacity: 1 },
						hidden: { opacity: 0 },
					}}
					transition={{ delay: 0.3 }}
					animate={step === 0 ? 'show' : 'hidden'}
					className={cn(step === 0 ? 'block' : 'hidden')}>
					<div className='mb-2'>
						<LabelWithError htmlFor='title' error={formState.errors?.title}>
							Title
						</LabelWithError>
						<Input name='title' type='text' placeholder='Product Title' defaultValue={title} />
					</div>
                    <div className='mb-4'>
						<LabelWithError htmlFor='price' error={formState.errors?.price}>
							Price
						</LabelWithError>
						<Input name='price' type='number' placeholder='Price' defaultValue={price}/>
					</div>
					<div className='mb-4'>
						<LabelWithError htmlFor='brandName' error={formState.errors?.brandName}>
							Outlet
						</LabelWithError>
						<Input name='brandName' type='text' placeholder='Brand name' defaultValue={brandName} />
					</div>

					<button className='text-sm bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 w-full'>
						<span>Save</span>
					</button>
				</m.div>
			</m.form>
		</LazyMotion>
	)
}

export default Form