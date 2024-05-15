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
	const customer = await db.customer.findUnique({
		where: {
			id: id
		},
	});

	return <Modal>{customer? <Form {...customer} /> : <div className='p-4'>Customer not found</div>}</Modal>;
};

export default Page;
