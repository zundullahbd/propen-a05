import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();

export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
    const body: User = await request.json();
    const hashPassword = await hash(body.password, 10);
    const account =  await prisma.user.update({
        where:{
            id: Number(params.id)
        },
        data:{
            username: body.username,
            email: body.email,
            password: hashPassword
        }
    });
    return NextResponse.json(account, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
    const account = await prisma.user.delete({
        where:{
            id: Number(params.id)
        }
    });
    return NextResponse.json(account, {status: 200});
}
