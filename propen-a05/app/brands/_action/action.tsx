'use server';
import { Brand } from '@prisma/client';
import { db } from '@/lib/prisma';
import { parse } from 'csv-parse/sync';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { schema } from './schema';
import { z } from 'zod';

export type FormState = {
	type: 'success' | 'error' | 'idle';
	errors: Record<string, string> | undefined;
};

export async function createBrand(prevState: FormState, formData: FormData): Promise<FormState> {
	try {
		const data = await schema.parseAsync({
			name: formData.get('name'),
			description: formData.get('description'),
			phone: formData.get('phone'),
			website: formData.get('website'),
			service: formData.get('service'),
			facebook: formData.get('facebook'),
			instagram: formData.get('instagram'),
			twitter: formData.get('twitter'),
			image: (formData.get('image') as File).size > 0 ? formData.get('image') : undefined,
		});

		await db.brand.create({
			data: data,
		});

		revalidatePath('/brands');
		return {
			type: 'success',
			errors: undefined,
		};
	} catch (error) {
		if (!(error instanceof z.ZodError)) throw error;

		const zodError = error as z.ZodError;
		const errorMap = zodError.flatten().fieldErrors;
		return {
			type: 'error',
			errors: Object.fromEntries(Object.entries(errorMap).map(([key, value]) => [key, value ? value[0] : ''])),
		};
	}
}

export async function editBrand(prevState: FormState, formData: FormData): Promise<FormState> {
	try {
		const id = formData.get('id') as string;

		const data = await schema.parseAsync({
			name: formData.get('name'),
			description: formData.get('description'),
			phone: formData.get('phone'),
			website: formData.get('website'),
			service: formData.get('service'),
			facebook: formData.get('facebook'),
			instagram: formData.get('instagram'),
			twitter: formData.get('twitter'),
			image: (formData.get('image') as File).size > 0 ? formData.get('image') : undefined,
		});

		await db.brand.update({
			where: { id: id },
			data: data,
		});

		revalidatePath(`/brands/${id}`);
		return {
			type: 'success',
			errors: undefined,
		};
	} catch (error) {
		if (!(error instanceof z.ZodError)) throw error;
		const zodError = error as z.ZodError;
		const errorMap = zodError.flatten().fieldErrors;

		return {
			type: 'error',
			errors: Object.fromEntries(Object.entries(errorMap).map(([key, value]) => [key, value ? value[0] : ''])),
		};
	}
}

export async function deleteBrand(prevState: FormState, formData: FormData): Promise<FormState> {
	try {
		const id = formData.get('id') as string;
		console.log(id);

		await db.brand.delete({
			where: { id: id },
		});

		revalidatePath('/brands');
		return {
			type: 'success',
			errors: undefined,
		};
	} catch (error) {
		return {
			type: 'error',
			errors: {},
		};
	} finally {
		redirect('/brands');
	}
}

export async function importBrand(prevState: FormState, formData: FormData): Promise<FormState> {
	try {
		const MAX_SIZE = 5 * 1024 * 1024;
		const FILE_TYPES = ['application/vnd.ms-excel', 'text/csv'];

		const schema = z.object({
			file: z
				.any()
				.refine((file) => file && file.size !== 0, 'The file is empty.')
				.refine((file) => file && file.size <= MAX_SIZE, 'Max file size is 5MB.')
				.refine((file) => file && FILE_TYPES.includes(file.type), 'Only csv files are accepted.'),
		});

		const data = await schema.parseAsync({
			file: formData.get('file') as File,
		});

		console.log(data.file);

		const csvSchema = z.object({
			name: z.string().min(3).max(255),
			description: z.string().min(50).max(255),
			phone: z.string().min(10).max(15),
			website: z.string().url(),
			service: z.string().optional(),
			facebook: z.string().optional(),
			instagram: z.string().optional(),
			twitter: z.string().optional(),
		});

		const content = await data.file.text();
		const temps = parse(content, {
			delimiter: ',',
			skipEmptyLines: true,
			columns: ['name', 'description', 'phone', 'website', 'service', 'facebook', 'instagram', 'twitter'],
		});

		const valid = temps.every((brand: any) => csvSchema.safeParse(brand).success);
		if (!valid) throw new Error('The csv schema is not valid, please check the file.');

		const brands: Array<z.infer<typeof csvSchema>> = temps;
		await db.brand.createMany({
			data: brands.map((brand: z.infer<typeof csvSchema>) => ({
				name: brand.name,
				description: brand.description,
				phone: brand.phone,
				website: brand.website,
				service: brand.service,
				facebook: brand.facebook,
				instagram: brand.instagram,
				twitter: brand.twitter,
			})),
		});

		revalidatePath('/brands');
		return {
			type: 'success',
			errors: undefined,
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			const zodError = error as z.ZodError;
			const errorMap = zodError.flatten().fieldErrors;

			return {
				type: 'error',
				errors: Object.fromEntries(
					Object.entries(errorMap).map(([key, value]) => [key, value ? value[0] : ''])
				),
			};
		}

		return {
			type: 'error',
			errors: {
				...(error instanceof Error ? { error: error.message } : {}),
			},
		};
	}
}