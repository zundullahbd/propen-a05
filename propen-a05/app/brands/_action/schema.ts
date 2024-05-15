import fs from 'fs';
import { z } from 'zod';

async function storeImage(file: File) {
	const data = await file.arrayBuffer();
	const filename = `${Date.now()}-${file.name}`;

	if (!fs.existsSync('@/public/uploads')) fs.mkdirSync('@/public/uploads', { recursive: true });
	fs.writeFileSync(`@/public/uploads/${filename}`, Buffer.from(data));
	return filename;
}

const MAX_SIZE = 5 * 1024 * 1024;
const FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

export const schema = z.object({
	name: z.string().min(3).max(255),
	description: z.string().min(50).max(255),
	phone: z.string().min(10).max(15),
	website: z.string().url(),

	service: z.string().optional(),
	facebook: z.string().optional(),
	instagram: z.string().optional(),
	twitter: z.string().optional(),

	image: z
		.any()
		.refine((file) => file && file.size <= MAX_SIZE, 'Max file size is 5MB.')
		.refine((file) => file && FILE_TYPES.includes(file.type), 'Only image files are accepted.')
		.transform((file) => file && storeImage(file).then((image) => image))
		.optional(),
});