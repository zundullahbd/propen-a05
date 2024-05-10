import { NextResponse } from 'next/server';
import type { Review } from '@prisma/client';
import { db } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

const schema = z.object({
	stars: z.coerce.number().int(),
	review: z.string().min(50).max(255),
	attitude: z.coerce.boolean(),
	speed: z.coerce.boolean(),
	communication: z.coerce.boolean(),
	outcome: z.coerce.boolean(),
	efficiency: z.coerce.boolean(),
});

export const POST = async (request: Request, { params }: { params: { id: string } }) => {
	const body: Review = await request.json();
	const id = Number(params.id);

	const user = await getServerSession();
	if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

	const result = schema.safeParse(body);
	if (!result.success) return NextResponse.json(result.error.issues, { status: 400 });

	const ticket = await db.ticket.findUnique({
		where: {
			id: id,
		},
	});
	if (!ticket) return NextResponse.json({ message: 'Ticket not found' }, { status: 400 });

	const review = await db.review.findFirst({
		where: {
			ticketId: ticket.id,
		},
	});
	if (review) return NextResponse.json({ message: 'Ticket already has a review' }, { status: 400 });

	const newReview = await db.review.create({
		data: {
			stars: body.stars,
			review: body.review,
			attitude: body.attitude,
			speed: body.speed,
			communication: body.communication,
			outcome: body.outcome,
			efficiency: body.efficiency,

			customerId: ticket.customerId,
			ticketId: ticket.id,
		},
	});

	return NextResponse.json(newReview, { status: 201 });
};