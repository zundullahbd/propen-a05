import Image from 'next/image';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import DeleteForm from '../_components/DeleteForm';
import { db } from '@/lib/prisma';
import { ArrowLeft, Facebook, Instagram, Link2, Pencil, Phone, Trash, Twitter } from 'lucide-react';


interface CustomerGridProps {
	page: number;
	sort: 'asc' | 'desc';
}

export const CustomerGrid: React.FC<CustomerGridProps> = async ({ page, sort }) => {
	const limit = 6;
	const offset = (page - 1) * limit;

	const customers = await db.customer.findMany({
		take: limit,
		skip: offset,
		orderBy: { name: sort },
	});

	const totalCustomers = await db.customer.count();
	const totalPages = Math.ceil(totalCustomers / limit);
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div>
            
            <table className="table w-full">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Outlet</th>
                    <th>Number</th>
                    <th>Customer Name</th>
                    <th>Code</th>
                    <th>Reference Number</th>
                    <th>Date</th>
                    <th>Created Time</th>
                    <th>Due</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Fulfillment</th>
                    <th className="text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer, index) => (
                    <tr key={customer.id}>
                        <td>{index + 1}</td>
                        <td>{customer.outlet}</td>
                        <td>{customer.number}</td>
                        <td>{customer.name}</td>
                        <td>{customer.code}</td>
                        <td>{customer.referenceNumber}</td>
                        <td>{customer.date}</td>
                        <td>{customer.createdTime}</td>
                        <td>{customer.due}</td>
                        <td>{customer.amount}</td>
                        <td>{customer.payment}</td>
                        <td>{customer.fulfillment}</td>
                        <td>
                        <Link
                            href={`/customers/${customer.id}/edit`}
                            className='text-sm text-white bg-indigo-700 py-2 px-4 rounded-lg flex items-center'>
                            <span>Edit</span>
                            <Pencil size={16} />
                        </Link>
                        </td>
                        <td className='flex items-center' style={{ paddingLeft: '0px', paddingTop: '10px'}}>
                        <React.Suspense fallback={null}>
                            <DeleteForm id={customer.id} />
                        </React.Suspense>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
	);
};
