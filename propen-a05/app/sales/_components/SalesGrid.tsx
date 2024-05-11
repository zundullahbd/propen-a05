import Image from 'next/image';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import DeleteForm from '../_components/DeleteForm';
import { db } from '@/lib/prisma';
import { ArrowLeft, Facebook, Instagram, Link2, Pencil, Phone, Trash, Twitter } from 'lucide-react';


interface SalesGridProps {
	page: number;
	sort: 'asc' | 'desc';
}

export const SalesGrid: React.FC<SalesGridProps> = async ({ page, sort }) => {
	const limit = 6;
	const offset = (page - 1) * limit;

	const sales = await db.sales.findMany({
		take: limit,
		skip: offset,
		orderBy: { name: sort },
	});

	const totalItem = await db.sales.count();
	const totalPages = Math.ceil(totalItem / limit);
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div>
            
            <table className="table w-full">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Outlet</th>
                    <th>Number</th>
                    <th>Name</th>
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
                {sales.map((sales, index) => (
                    <tr key={sales.id}>
                        <td>{index + 1}</td>
                        <td>{sales.outlet}</td>
                        <td>{sales.number}</td>
                        <td>{sales.name}</td>
                        <td>{sales.code}</td>
                        <td>{sales.referenceNumber}</td>
                        <td>{sales.date}</td>
                        <td>{sales.createdTime}</td>
                        <td>{sales.due}</td>
                        <td>{sales.amount}</td>
                        <td>{sales.payment}</td>
                        <td>{sales.fulfillment}</td>
                        <td>
                        <Link
                            href={`/sales/${sales.id}/edit`}
                            className='text-sm text-white bg-indigo-700 py-2 px-4 rounded-lg flex items-center'>
                            <span>Edit</span>
                            <Pencil size={16} />
                        </Link>
                        </td>
                        <td className='flex items-center' style={{ paddingLeft: '0px', paddingTop: '10px'}}>
                        <React.Suspense fallback={null}>
                            <DeleteForm id={sales.id} />
                        </React.Suspense>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
	);
};
