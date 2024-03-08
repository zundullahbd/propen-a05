import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Customer } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
    const body: Customer = await request.json();
    const customer = await prisma.customer.update({
        where:{
            id: Number(params.id)
        },
        data:{
            name: body.name,
            gender: body.gender,
            year_of_birth: body.year_of_birth,
            address: body.address,
        }
    });
    return NextResponse.json(customer, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
    const customer = await prisma.customer.delete({
        where:{
            id: Number(params.id)
        }
    });
    return NextResponse.json(customer, {status: 200});
}