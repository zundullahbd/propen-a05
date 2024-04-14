import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Product } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) =>{
    const body: Product = await request.json();
    const product = await prisma.product.create({
        data:{
            title: body.title,
            price: body.price,
            brandId: body.brandId,
            productId: body.productId,
            category: body.category,
        }
    });
    return NextResponse.json(product, {status: 201});
}

export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
    const body: Product = await request.json();
    const product = await prisma.product.update({
        where:{
            id: Number(params.id)
        },
        data:{
            title: body.title,
            price: body.price,
            brandId: body.brandId
        }
    });
    return NextResponse.json(product, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
    const product = await prisma.product.delete({
        where:{
            id: Number(params.id)
        }
    });
    return NextResponse.json(product, {status: 200});
}
