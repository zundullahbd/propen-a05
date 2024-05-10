import { z } from 'zod';

const schema = z.object({
	title: z.string().min(3).max(255),
	customerId: z.coerce.number().int(),
	salesId: z.coerce.number().int(),
	category: z.enum(['KOMPLAIN', 'INFORMASI', 'GARANSI']),
	description: z.string().min(50).max(255),
	status: z.enum(['SUBMITTED', 'REVIEWED', 'INPROGRESS', 'RESOLVED', 'CLOSED']),
});

export default schema;