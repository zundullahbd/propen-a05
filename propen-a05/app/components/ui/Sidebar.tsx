'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { navLinks } from '@/lib/constants';
import { usePathname } from 'next/navigation';

interface SidebarLinkProps {
	href: string;
	icon: string;
	title: string;
	active: boolean;
}

const SidebarLink = ({ href, icon, title, active }: SidebarLinkProps) => {
	return (
		<Link
			href={href}
			className={cn(
				'flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg',
				active && 'bg-indigo-100'
			)}>
			<Image src={icon} alt={title} width={20} height={20} />
			<span className='ml-3'>{title}</span>
		</Link>
	);
};

const Sidebar = () => {
	const pathname = usePathname();
	const current = pathname.split('/')[1];

	return (
		<>
			{navLinks.map((link) => (
				<SidebarLink
					key={link.href}
					href={link.href}
					icon={link.icon}
					title={link.title}
					active={`/${current}` === link.href}
				/>
			))}
		</>
	);
};

export default Sidebar;