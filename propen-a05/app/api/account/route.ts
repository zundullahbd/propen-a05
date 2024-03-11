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
