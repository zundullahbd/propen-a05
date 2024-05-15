import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Article } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) =>{
    const body: Article = await request.json();
    const article = await prisma.article.create({
        data:{
            title: body.title,
            text: body.text,
        }
    });
    return NextResponse.json(article, {status: 201});
}
