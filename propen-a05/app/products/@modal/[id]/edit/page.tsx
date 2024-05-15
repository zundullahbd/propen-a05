import Form from '../../../_components/EditForm';
import Modal from '../../../_components/Modal';
import React from 'react';
import { db } from '@/lib/prisma';

interface PageProps {
	params: {
		id: string;
	};
}

const Page: React.FC<PageProps> = async ({ params }) => {
	const { id } = params;
	const product = await db.product.findUnique({
		where: {
			id: id
		},
	});

	return <Modal>{product? <Form {...product} /> : <div className='p-4'>No item found</div>}</Modal>;
};

export default Page;
