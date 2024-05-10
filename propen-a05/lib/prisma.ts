import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

<<<<<<< HEAD
export const db = prisma;
=======
export const db = prisma;
>>>>>>> 0001665ae6f3904837e3ddc34745f811f11fc882
