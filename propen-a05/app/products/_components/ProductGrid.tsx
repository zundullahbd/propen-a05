import Image from 'next/image';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import DeleteForm from '../_components/DeleteForm';
import { db } from '@/lib/prisma';
import { ArrowLeft, Instagram, Link2, Pencil, Phone, Trash} from 'lucide-react';


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

	return (
		<div>
            
            <table className="table w-full">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Brand Name</th>
                    <th className="text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {product.map((product, index) => (
                    <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>{product.brandName}</td>
                        <td>
                        <Link
                            href={`/products/${product.id}/edit`}
                            className='text-sm text-white bg-indigo-700 py-2 px-4 rounded-lg flex items-center'>
                            <span>Edit</span>
                            <Pencil size={16} />
                        </Link>
                        </td>
                        <td className='flex items-center' style={{ paddingLeft: '0px', paddingTop: '10px'}}>
                        <React.Suspense fallback={null}>
                            <DeleteForm id={product.id} />
                        </React.Suspense>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
	);
};
