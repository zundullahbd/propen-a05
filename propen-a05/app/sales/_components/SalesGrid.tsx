import Link from 'next/link';
import React from 'react';
import DeleteForm from '../_components/DeleteForm';
import { db } from '@/lib/prisma';
import { Pencil } from 'lucide-react';
import Table from '@/app/components/table/Table';


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
    const header = ['#', 'Outlet', 'Number', 'Name', 'Code', 'Reference Number', 'Date', 'Created Time', 'Amount', 'Payment', 'Fulfillment', 'Actions'];

    return (
        <div>
            <Table header={header} className='w-full items-center justify-between'>
                {sales.map((sales, index) => (
                    <tr key={index} className='text-center items-center justify-between w-full py-2'>
                        <td className="py-[10px]">{index + 1}</td>
                        <td>{sales.outlet}</td>
                        <td>{sales.number}</td>
                        <td>{sales.name}</td>
                        <td>{sales.code}</td>
                        <td>{sales.referenceNumber}</td>
                        <td>{sales.date}</td>
                        <td>{sales.createdTime}</td>
                        <td>{sales.amount}</td>
                        <td>{sales.payment}</td>
                        <td>{sales.fulfillment}</td>
                        <td className='flex flex-col items-stretch justify-between p-2'>
                            <Link href={`/sales/${sales.id}/edit`} className='flex items-center justify-end px-2 py-0'>
                                <button className='text-sm bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex justify-center items-center space-x-2'>
                                    <span>Edit</span>
                                    <Pencil size={16} />
                                </button>
                            </Link>
                        </td>
                        <td className='flex items-center justify-center px-2 py-2'>
                            <React.Suspense fallback={null}>
                                <DeleteForm id={sales.id} />
                            </React.Suspense>
                        </td>
                    </tr>
                ))}
            </Table>
        </div>
    );
};
