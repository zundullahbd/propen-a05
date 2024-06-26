import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();

export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
    const body: User = await request.json();
    const hashPassword = await hash(body.password, 10);
    const user =  await prisma.user.update({
        where:{
            id: params.id
        },
        data:{
            username: body.username,
            email: body.email,
            role: body.role,
            password: hashPassword
            
        }
    });
    return NextResponse.json(user, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
    const user = await prisma.user.delete({
        where:{
            id: params.id
        }
    });
    return NextResponse.json(user, {status: 200});
}

export const GET = async (request: Request, {params}: {params: {id: string}}) =>{
    const user = await prisma.user.findUnique({
        where:{
            id: params.id
        }
    });
    return NextResponse.json(user, {status: 200});
}