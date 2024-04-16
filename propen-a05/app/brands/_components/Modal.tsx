'use client'

import * as React from 'react'

import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'

import CloseLink from './CloseLink'

interface ModalProps {
	children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ children }) => {
	const ref = React.useRef<HTMLDivElement>(null)

	// check the
	return (
		<LazyMotion features={domAnimation}>
			<div className='absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 '>
				<AnimatePresence>
					<m.div
						ref={ref}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className='relative bg-white rounded-lg max-w-lg w-full'>
						<CloseLink className='absolute top-0 right-0 m-4' />
						{children}
					</m.div>
				</AnimatePresence>
			</div>
		</LazyMotion>
	)
}

export default Modal