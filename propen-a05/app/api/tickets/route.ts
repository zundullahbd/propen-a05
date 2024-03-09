import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Ticket } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) =>{
    const body: Ticket = await request.json();
    const tickets = await prisma.ticket.create({
        data:{
            title: body.title,
            customerId: body.customerId,
            productSalesId: body.productSalesId,
            category: body.category || "", // Default to empty string if not provided
            description: body.description || "", // Default to empty string if not provided
            status: body.status || "", // Default to empty string if not provided
        }
    });
    return NextResponse.json(tickets, {status: 201});
}