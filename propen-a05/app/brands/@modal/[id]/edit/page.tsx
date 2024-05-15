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
	const brand = await db.brand.findUnique({
		where: {
			id: id,
		},
	});

	return <Modal>{brand ? <Form {...brand} /> : <div className='p-4'>Brand not found</div>}</Modal>;
};

export default Page;