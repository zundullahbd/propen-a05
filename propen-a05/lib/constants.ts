import { Check, FileInput, SearchCheck, Star, Wrench } from 'lucide-react';

export const navLinks = [
	{ href: '/home', icon: '/home.svg', title: 'Home' },
	{ href: '/dashboard', icon: '/dashboard.svg', title: 'Dashboard' },
	{ href: '/tickets', icon: '/complaint management.svg', title: 'Complaint Management' },
	{ href: '/products', icon: '/package.svg', title: 'Products' },
	{ href: '/productsales', icon: '/product sales.svg', title: 'Product Sales' },
	{ href: '/brands', icon: '/brands.svg', title: 'Brands' },
	{ href: '/users', icon: '/user management.svg', title: 'User Management' },
	{ href: '/customers', icon: '/customers.svg', title: 'Customers' },
];

export const categoryOptions = [
	{ value: 'KOMPLAIN', label: 'Komplain' },
	{ value: 'INFORMASI', label: 'Bantuan Informasi' },
	{ value: 'GARANSI', label: 'Klaim Garansi' },
];

export const statusOptions = [
	{ value: 'SUBMITTED', label: 'Submitted' },
	{ value: 'REVIEWED', label: 'Reviewed' },
	{ value: 'INPROGRESS', label: 'In Progress' },
	{ value: 'RESOLVED', label: 'Resolved' },
	{ value: 'CLOSED', label: 'Closed' },
];

export const ticketSteps = [
	{ value: 'SUBMITTED', label: 'Submitted', icon: FileInput },
	{ value: 'REVIEWED', label: 'Reviewed', icon: SearchCheck },
	{ value: 'INPROGRESS', label: 'In Progress', icon: Wrench },
	{ value: 'RESOLVED', label: 'Resolved', icon: Check },
	{ value: 'CLOSED', label: 'Closed', icon: Star },
];