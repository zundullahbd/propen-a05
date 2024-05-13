'use client'

import * as React from 'react'

import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'
import { FormState, deleteSales } from '../_actions/action'
import { Trash, X } from 'lucide-react'

import { toast } from 'sonner'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'

interface FormProps {
	id:  number
}

const Form: React.FC<FormProps> = ({ id }) => {
	const [open, setOpen] = React.useState(false)

	const router = useRouter()
	const [formState, formAction] = useFormState<FormState, FormData>(deleteSales, {
		type: 'idle',
		errors: undefined,
	})

	React.useEffect(() => {
		if (formState.type === 'success') {
			toast.success('Delete item', {
				description: 'Item deleted successfully',
			})
			router.back()
		}
	}, [router, formState])

	return (
		<>
			<button
				className='text-sm border border-red-500 text-red-500 py-2 px-2 rounded-lg flex items-center justify-center space-x-2'
				onClick={() => setOpen(true)}>
				<span>Delete</span>
				<Trash size={16} />
			</button>

			<LazyMotion features={domAnimation}>
				<AnimatePresence>
					{open && (
						<div className='absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
							<m.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
								className='relative bg-white rounded-lg max-w-md w-full'>
								<div className='absolute top-0 right-0 m-4'>
									<button
										onClick={() => setOpen(false)}
										className='text-sm hover:bg-gray-200 text-gray-500 h-6 w-6 flex items-center justify-center rounded-md'>
										<X size={16} />
									</button>
								</div>

								<div className='p-4 border-b border-gray-200'>
									<h1>Delete item</h1>
								</div>

								<div className='flex flex-col p-4 border-b border-gray-200'>
									<p className='text-sm text-muted-foreground'>
										Are you sure you want to delete this item?
										<br />
										This action cannot be undone.
									</p>
								</div>

								<form className='flex items-center justify-end w-full p-4' action={formAction}>
									<input type='hidden' name='id' value={id} />

									<button className='text-sm bg-red-500 text-white font-medium py-2 px-4 rounded-lg'>
										<span>Delete</span>
									</button>
								</form>
							</m.div>
						</div>
					)}
				</AnimatePresence>
			</LazyMotion>
		</>
	)
}

export default Form