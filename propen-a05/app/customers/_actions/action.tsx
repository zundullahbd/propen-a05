'use server';

// import * as csv from 'csv';

import * as fs from 'fs';

import { Customer } from '@prisma/client';
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

export async function createCustomer(prevState: FormState, formData: FormData): Promise<FormState> {
	try {
		const data = await schema.parseAsync({
			outlet: formData.get('outlet'),
			number: formData.get('number'),
			name: formData.get('name'),
			code: formData.get('code'),
			referenceNumber: formData.get('referenceNumber'),
			date: formData.get('date'),
			createdTime: formData.get('createdTime'),
			due: formData.get('due'),
			amount: Number(formData.get('amount')),
            payment: formData.get('payment'),
            fulfillment: formData.get('fulfillment'),
            
		});

		await db.customer.create({
			data: data,
		});

		revalidatePath('/customers');
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

export async function editCustomer(prevState: FormState, formData: FormData): Promise<FormState> {
	try {
		const id = Number.parseInt(formData.get('id') as string, 10);

		const data = await schema.parseAsync({
			outlet: formData.get('outlet'),
			number: formData.get('number'),
			name: formData.get('name'),
			code: formData.get('code'),
			referenceNumber: formData.get('referenceNumber'),
			date: formData.get('date'),
			createdTime: formData.get('createdTime'),
			due: formData.get('due'),
			amount: Number(formData.get('amount')),
            payment: formData.get('payment'),
            fulfillment: formData.get('fulfillment'),
		});

		await db.customer.update({
			where: { id: id },
			data: data,
		});

		revalidatePath(`/customers/${id}`);
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

export async function deleteCustomer(prevState: FormState, formData: FormData): Promise<FormState> {
	try {
		const id = Number.parseInt(formData.get('id') as string, 10);
		console.log(id);

		await db.customer.delete({
			where: { id: id },
		});

		revalidatePath('/customers');
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
		redirect('/customers');
	}
}

export async function importCustomer(prevState: FormState, formData: FormData): Promise<FormState> {
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
			outlet: z.string().min(3).max(255),
			number: z.string().min(1),
			name: z.string(),
			code: z.string(),
			referenceNumber: z.string(),
			date: z.string(),
			createdTime: z.string(),
			due: z.string(),
            amount: z.number(),
            payment: z.string(),
            fulfillment: z.string(),
		});

		const content = await data.file.text();
		const temps = parse(content, {
			delimiter: ',',
			skipEmptyLines: true,
			columns: ['outlet', 'number', 'name', 'code', 'referenceNumber', 'date', 'createdTime', 'due', 'amount', 'payment', 'fulfillment'],
		});

		const valid = temps.every((customer: any) => csvSchema.safeParse(customer).success);
		if (!valid) throw new Error('The csv schema is not valid, please check the file.');

		const customers: Array<z.infer<typeof csvSchema>> = temps;
		await db.customer.createMany({
			data: customers.map((customer: z.infer<typeof csvSchema>) => ({
				outlet: customer.outlet,
                number: customer.number,
                name: customer.name,
                code: customer.code,
                referenceNumber: customer.referenceNumber,
                date: customer.date,
                createdTime: customer.createdTime,
                due: customer.due,
                amount: Number(customer.amount),
                payment: customer.payment,
                fulfillment: customer.fulfillment,
			})),
		});

		revalidatePath('/customers');
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