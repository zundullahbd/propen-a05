import Link from 'next/link';
import React from 'react';
import DeleteForm from '../_components/DeleteForm';
import { db } from '@/lib/prisma';
import { Pencil } from 'lucide-react';
import Table from '@/app/components/table/Table';


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
    const header = ["#", "Outlet", "Number", "Name", "Code", "Reference Number", "Date", "Created Time", "Due", "Amount", "Payment", "Fulfillment", "Actions"]

    return (
        <div>

            <Table header={header} className='w-full items-center justify-between'  >
                {customers.map((customer, index) => (
                    <tr key={index} className='text-center items-center justify-between'>
                        <td className="py-[18px]">{index + 1}</td>
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
                        <td className='flex flex-wrap items-stretch justify-center p-2'>
                            <Link href={`/customers/${customer.id}/edit`} className='flex items-center justify-center px-0'>
                                <button className='text-sm bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex justify-center items-center space-x-2'>
                                    <span>Edit</span>
                                    <Pencil size={16} />
                                </button>
                            </Link>
                        </td>
                        <td className='flex items-center justify-center px-2 py-2'>
                            <React.Suspense fallback={null}>
                                <DeleteForm id={customer.id} />
                            </React.Suspense>
                        </td>
                    </tr>
                ))}
            </Table>
        </div>
    );
};
