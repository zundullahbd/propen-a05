import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();

export const POST = async (request: Request) =>{
    const body: User = await request.json();
    const hashPassword = await hash(body.password, 10);
    const account = await prisma.user.create({
        data:{
            email: body.email,
            password: hashPassword,
            username: body.username,
        }
    });
    return NextResponse.json(account, {status: 201});
}


export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
    const body: User = await request.json();
    const user =  await prisma.user.update({
        where:{
            id: Number(params.id)
        },
        data:{
            username: body.username,
            email: body.email,
            
        }
    });
    return NextResponse.json(user, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
    const user = await prisma.user.delete({
        where:{
            id: Number(params.id)
        }
    });
    return NextResponse.json(user, {status: 200});
}
