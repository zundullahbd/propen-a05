'use client'

import * as React from 'react'

import { FormState, importBrand } from '../_action/action'

import { File } from 'lucide-react'
import { LabelWithError } from './LabelWithError'
import { toast } from 'sonner'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'

interface FormProps {
	//
}

const Form: React.FC<FormProps> = ({ ...props }) => {
	const ref = React.useRef<HTMLInputElement>(null)
	const [filename, setFilename] = React.useState<string | null>(null)

	const router = useRouter()
	const [formState, formAction] = useFormState<FormState, FormData>(importBrand, {
		type: 'idle',
		errors: undefined,
	})

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) setFilename(e.target.files[0].name)
	}

	React.useEffect(() => {
		if (formState.type === 'success') {
			toast.success('Import Brand', {
				description: 'Brand imported successfully',
			})
			router.back()
		}
	}, [router, formState])

	const error = formState.errors ? Object.values(formState.errors).join(' ') : ''

	return (
		<>
			<div className='p-4 border-b border-gray-200'>
				<h1>Import Brand Data</h1>
			</div>

			<form className='flex flex-col p-4 border-b border-gray-200' action={formAction}>
				<div className='mb-4'>
					<LabelWithError htmlFor='file' error={error}>
						CSV File
					</LabelWithError>
					<div
						onClick={() => ref.current?.click()}
						className='w-full aspect-video border border-gray-200 rounded-lg flex items-center justify-center cursor-pointer relative'>
						<span className='text-gray-500 text-sm flex items-center justify-center'>
							<File size={16} className='mr-2' />
							{filename ? filename : 'Upload file (.csv format)'}
							<input
								type='file'
								name='file'
								className='sr-only'
								onChange={handleFileChange}
								ref={ref}
								accept='.csv'
							/>
						</span>
					</div>
				</div>

				<button className='text-sm bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2'>
					<span>Import</span>
				</button>
			</form>
		</>
	)
}

export default Form