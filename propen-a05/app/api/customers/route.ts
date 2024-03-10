import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Customer } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) =>{
    const body: Customer = await request.json();
    const customer = await prisma.customer.create({
        data:{
            name: body.name,
            gender: body.gender,
            year_of_birth: body.year_of_birth,
            address: body.address,
            user: {} // Add an empty object for the 'user' property
        }
    });
    return NextResponse.json(customer, {status: 201});
}