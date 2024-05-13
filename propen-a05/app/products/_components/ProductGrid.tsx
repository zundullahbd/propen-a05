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

export const ProductGrid: React.FC<SalesGridProps> = async ({ page, sort }) => {
    const limit = 6;
    const offset = (page - 1) * limit;

    const product = await db.product.findMany({
        take: limit,
        skip: offset,
        orderBy: { title: sort },
    });

    const totalItem = await db.product.count();
    const totalPages = Math.ceil(totalItem / limit);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const tableHeaders = ["#", "ID", "Name", "Price", "Brand", "Actions"]

    return (
        <div>
            <Table header={tableHeaders}>
                {product.map((product, index) => (
                    <tr key={index} className='text-center items-center justify-between'>
                        <td className="py-[18px]">{index + 1}</td>
                        <td>{product.id}</td>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>{product.brandName}</td>
                        <td className='flex flex-wrap items-stretch justify-center p-2'>
                            <Link href={`/products/${product.id}/edit`} className='flex items-center justify-center px-0'>
                                <button className='text-sm bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex justify-center items-center space-x-2'>
                                    <span>Edit</span>
                                    <Pencil size={16} />
                                </button>
                            </Link>
                        </td>
                        <td className='flex items-center justify-center px-2 py-2'>
                            <React.Suspense fallback={null}>
                                <DeleteForm id={product.id} />
                            </React.Suspense>
                        </td>
                    </tr>
                ))}
            </Table>
        </div>
    );
};
