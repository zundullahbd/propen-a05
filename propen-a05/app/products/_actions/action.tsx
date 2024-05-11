'use server';

// import * as csv from 'csv';

import * as fs from 'fs';

import { Product } from '@prisma/client';
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

export async function createProduct(prevState: FormState, formData: FormData): Promise<FormState> {
	try {
		const data = await schema.parseAsync({
			title: formData.get('title'),
			price: Number(formData.get('price')),
			brandName: formData.get('brandName'),
		});

		await db.product.create({
			data: data,
		});

		revalidatePath('/products');
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

export async function updateProduct(prevState: FormState, formData: FormData): Promise<FormState> {
	try {
		const id = Number.parseInt(formData.get('id') as string, 10);
		const data = await schema.parseAsync({
			title: formData.get('title'),
			price: Number(formData.get('price')),
			brandName: formData.get('brandName'),
		});

		await db.product.update({
			where: { id: id },
			data: data,
		});

		revalidatePath(`/products/${id}`);
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

export async function deleteProduct(prevState: FormState, formData: FormData): Promise<FormState> {
	try {
		const id = Number.parseInt(formData.get('id') as string, 10);
		console.log(id);

		await db.product.delete({
			where: { id: id },
		});

		revalidatePath('/products');
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
		redirect('/products');
	}
}

export async function importProduct(prevState: FormState, formData: FormData): Promise<FormState> {
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
			title: z.string(),
            price: z.number(),
			brandName: z.string(),
		});

		const content = await data.file.text();
		const temps = parse(content, {
			delimiter: ',',
			skipEmptyLines: true,
			columns: ['title', 'price', 'brand_name'],
		});

		const valid = temps.every((product: any) => csvSchema.safeParse(product).success);
		if (!valid) throw new Error('The csv schema is not valid, please check the file.');

		const product: Array<z.infer<typeof csvSchema>> = temps;
		await db.product.createMany({
			data: product.map((product: z.infer<typeof csvSchema>) => ({
				title: product.title,
                price: Number(product.price),
				brandName: product.brandName,
			})),
		});

		revalidatePath('/products');
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