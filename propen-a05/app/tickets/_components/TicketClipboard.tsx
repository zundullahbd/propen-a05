'use client';

import * as React from 'react';

import { LazyMotion, domAnimation, m } from 'framer-motion';

import { Clipboard } from 'lucide-react';
import Link from 'next/link';
import PrimaryButton from '@/app/components/ui/PrimaryButton';

const TicketClipboard = ({ id }: { id: string }) => {
	const [isMounted, setIsMounted] = React.useState(false);
	const [isOpen, setIsOpen] = React.useState(false);

	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;
	const ticketURL = `${window.location.origin}/tracking/${id}`;

	const copyUrl = () => {
		navigator.clipboard.writeText(ticketURL).then(() => {
			setIsOpen(false);
		});
	};

	return (
		<div className='flex items-center justify-end space-x-4 relative'>
			<PrimaryButton onClick={() => setIsOpen(true)} text='Generate Link' className='text-sm' />

			<LazyMotion features={domAnimation}>
				{isOpen && (
					<m.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3 }}
						className='absolute top-full right-0 bg-white rounded-lg p-6 text-sm mt-6 border border-gray-200'>
						<div className='flex flex-row justify-between items-center mb-2'>
							<h2 className='font-semibold'>Ticket #{id}</h2>
							<button onClick={() => setIsOpen(false)}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									className='w-5 h-5'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</button>
						</div>
						<p className='mb-4'>Use this link to track your complaint status in real time</p>

						<div className='px-3 py-2 bg-gray-100 rounded-lg relative pe-10'>
							<Link href={`/tracking/${id.toString()}`}>
								<span className='text-primary whitespace-nowrap'>{ticketURL}</span>
							</Link>

							<button onClick={copyUrl} className='absolute right-3 top-1/2 -translate-y-1/2'>
								<Clipboard size={16} />
							</button>
						</div>
					</m.div>
				)}
			</LazyMotion>
		</div>
	);
};

export default TicketClipboard;