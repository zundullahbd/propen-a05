import fs from 'fs';
import { z } from 'zod';

async function storeImage(file: File) {
	const data = await file.arrayBuffer();
	const filename = `${Date.now()}-${file.name}`;

	if (!fs.existsSync('public/uploads')) fs.mkdirSync('public/uploads', { recursive: true });
	fs.writeFileSync(`public/uploads/${filename}`, Buffer.from(data));
	return filename;
}

const MAX_SIZE = 5 * 1024 * 1024;


export const schema = z.object({
			title: z.string(),
            price: z.number(),
            brandName: z.string(),
});