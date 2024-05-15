import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Customer } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) =>{
    const body: Customer = await request.json();
    const customer = await prisma.customer.create({
        data:{
            outlet: body.outlet,
            number: body.number,
            name: body.name,
            code: body.code,
            referenceNumber: body.referenceNumber,
            date: body.date,
            createdTime: body.createdTime,
            due: body.due,
            amount: body.amount,
            payment: body.payment,
            fulfillment: body.fulfillment,
        }
    });
    return NextResponse.json(customer, {status: 201});
}

export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
    const body: Customer = await request.json();
    const customer = await prisma.customer.update({
        where:{
            id: params.id
        },
        data:{
            outlet: body.outlet,
            number: body.number,
            name: body.name,
            code: body.code,
            referenceNumber: body.referenceNumber,
            date: body.date,
            createdTime: body.createdTime,
            due: body.due,
            amount: body.amount,
            payment: body.payment,
            fulfillment: body.fulfillment,
        }
    });
    return NextResponse.json(customer, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
    const customer = await prisma.customer.delete({
        where:{
            id: params.id
        }
    });
    return NextResponse.json(customer, {status: 200});
}