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
	const sales = await db.sales.findUnique({
		where: {
			id: Number.parseInt(id, 10),
		},
	});

	return <Modal>{sales? <Form {...sales} /> : <div className='p-4'>No item found</div>}</Modal>;
};

export default Page;
