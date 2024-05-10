import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Article } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
    const body: Article = await request.json();
    const article = await prisma.article.update({
        where:{
            id: Number(params.id)
        },
        data:{
            title: body.title,
            text: body.text,
        }
    });
    return NextResponse.json(article, {status: 200});
}



export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
    const article = await prisma.article.delete({
        where:{
            id: Number(params.id)
        }
    });
    return NextResponse.json(article, {status: 200});
}

