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
<<<<<<< HEAD
=======

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
>>>>>>> 4d6a3d7571d0d6ab0df8f5173c9d1b5ddc630acb
