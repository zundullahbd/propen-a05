import { Calendar } from '@/components/ui/calendar';
import Image from 'next/image';
import { ProductActions } from './ProductActions';
import React from 'react';
import { TicketActions } from './TicketActions';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import AnimatedText from '@/components/ui/AnimatedText';
import DashboardActions from './DashboardActions';

const page = async () => {
	const session = await getServerSession(authOptions);
	const languages = ['Welcome Back, ', 'Bienvenue, ', 'Selamat Datang Kembali, '];
	if (!session) redirect('/');

	let Component = null;

	switch (session.user.role) {
		case 'CustomerService':
			Component = TicketActions;
			break;
		case 'Sales':
			Component = ProductActions;
			break;
		case 'Executive':
			Component = DashboardActions;
			break;
		default:
			break;
	}

	return (
		<>
			<div className='grid lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8'>
				<div className='col-span-4 flex flex-col xl:flex-row space-y-6 xl:space-y-0 xl:space-x-6'>
					<div className='bg-indigo-200 rounded-xl border border-gray-200 px-10 pb-0 w-full'>
						<div className='grid lg:grid-rows-1 gap-0 items-center h-full w-full'>
							<div className='flex flex-col pt-10 pb-4 place-items-center'>
								<AnimatedText languages={languages}>{session.user.username}</AnimatedText> 
								<div className='font-medium py-2 align-middle'>Manage and resolve customer issues with ease.</div>
							</div>
							<div className='flex justify-center items-center pb-10 pt-0'>
								<Image
									src='illustration landing page.svg'
									alt='Illustration home page'
									width={300}
									height={300}
								/>
							</div>
						</div>
					</div>
					<div className='bg-white rounded-xl border border-gray-200 px-8 pt-2 pb-4 flex-none flex items-center justify-center'>
						<Calendar className='mx-auto cursor-pointer' />
					</div>
				</div>
				<React.Suspense fallback={<div>Loading...</div>}>
					{Component ? <Component /> : null}
				</React.Suspense>
			</div>

			<div>
				<h2 className='font-semibold mb-2 px-4'>About BestCare</h2>
				<div className='bg-white rounded-xl border border-gray-200 p-8 mb-4'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
						<div>
							<p className='text-sm'>
								BestCare is a customer service management information system for PT Best Price
								Elektronik Indonesia to provide superior customer experience, strengthen cooperation with
								partner brands, and improve efficiency in complaint handling and analysis of product
								performance and customer satisfaction.
							</p>
							<br></br>
							<p className='text-sm'>
								BestCare provides several features such as dashboard, complaint management,
								product management, brand management, faqs and articles, customer management,
								and user management that can help users perform their tasks more efficiently.
							</p>
						</div>
						<div className='flex justify-center items-center'>
							<img
								src='/logo bp.png'
								alt='logo best price'
								style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default page;