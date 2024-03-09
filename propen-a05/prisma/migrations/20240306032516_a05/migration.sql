/*
  Warnings:

  - Changed the type of `year_of_birth` on the `Customer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "year_of_birth",
ADD COLUMN     "year_of_birth" INTEGER NOT NULL;
