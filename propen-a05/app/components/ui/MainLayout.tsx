// components/Sidebar.js
'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const links = [
	{
		href: '/home',
		name: 'Home',
		image: '/home.svg',
	},
	{
		href: '/dashboard',
		name: 'Dashboard',
		image: '/dashboard.svg',
	},
	{
		href: '/tickets',
		name: 'Complaint Management',
		image: '/complaint management.svg',
	},
	{
		href: '/products',
		name: 'Products',
		image: '/package.svg',
	},
	{
		href: '/productsales',
		name: 'Product Sales',
		image: '/product sales.svg',
	},
	{
		href: '/brands',
		name: 'Brands',
		image: '/brands.svg',
	},
	{
		href: '/users',
		name: 'User Management',
		image: '/user management.svg',
	},
	{
		href: '/customers',
		name: 'Customers',
		image: '/customers.svg',
	},
	{
		href: '/articles',
		name: 'FAQ & Article',
		image: '/knowledge base.svg',
	},
	// {
	// 	href: '/knowledgebase',
	// 	name: 'Knowledge Base',
	// 	image: '/knowledge base.svg',
	// },
];

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const router = useRouter();
	const pathName = usePathname();
	const [activePage, setActivePage] = useState('/home');

	const handlePageClick = (path: string, e: React.MouseEvent) => {
		e.preventDefault();
		router.push(path);
	};

	useEffect(() => {
		setActivePage(pathName);
	}, [pathName]);

	return (
		<div className='h-[90vh] w-full bg-gray-100 position-absolute overflow-clip flex-wrap'>
			<div className='flex resize-none w-full h-full'>
				<nav className='flex flex-col p-4 w-60 bg-white h-full space-y-3 text-sm flex-shrink-0'>
					{links.map((link) => (
						<Link href={link.href} key={link.href} onClick={(e) => handlePageClick(link.href, e)}>
							<div
								className={cn(
									'flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg',
									activePage === link.href ? 'bg-indigo-100 font-bold' : 'hover:bg-indigo-100'
								)}>
								<Image src={link.image} alt={link.name} width={20} height={20} />
								<span className='ml-3'>{link.name}</span>
							</div>
						</Link>
					))}
					<div className='flex items-center p-20 '>
						<span className='ml-1'>V1.0.0</span>
					</div>
				</nav>

				<div className='flex-grow overflow-y-auto p-4'>
					<div className='w-full max-w-7xl mx-auto'>{children}</div>
				</div>
			</div>
		</div>
	);
};

export default MainLayout;
