import { NextResponse } from 'next/server';
import type { Ticket } from '@prisma/client';
import { db } from '@/lib/prisma';
import schema from '@/schemas/ticketSchema';

export const POST = async (request: Request) => {
	const body: Ticket = await request.json();

	const result = schema.safeParse(body);
	if (!result.success) return NextResponse.json(result.error.issues, { status: 400 });

	const customer = await db.customer.findUnique({
		where: {
			id: body.customerId,
		},
	});
	if (!customer) return NextResponse.json({ message: 'Customer not found' }, { status: 400 });

	const sales = await db.sales.findUnique({
		where: {
			id: body.salesId,
		},
	});
	if (!sales) return NextResponse.json({ message: 'Order not found' }, { status: 400 });

	const tickets = await db.ticket.create({
		data: {
			title: body.title,
			customerId: body.customerId,
			salesId: body.salesId,
			category: body.category,
			description: body.description,
			status: body.status,
		},
	});

	return NextResponse.json(tickets, { status: 201 });
};