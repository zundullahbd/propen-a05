import { FC, ReactNode } from 'react';

import Image from 'next/image';

interface AuthLayoutProps {
	children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
	return (
		<div className='grid lg:grid-cols-2'>
			<div className='hidden h-screen lg:block'>
				<div className='flex w-full h-full justify-center items-center bg-indigo-100 rounded-l-none rounded-r-[3rem] shadow-md shadow-blur-sm shadow-spread-lg'>
					<Image
						alt='landing'
						src='/amico.svg'
						width={500}
						height={500}
						className='max-w-[500px] max-h-[500px] object-contain'
					/>
				</div>
			</div>
			<div className='relative h-screen'>
				<div className='flex w-full h-full justify-center items-center'>{children}</div>
			</div>
		</div>
	);
};
export default AuthLayout;