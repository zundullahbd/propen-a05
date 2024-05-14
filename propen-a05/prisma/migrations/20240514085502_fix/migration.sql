/*
  Warnings:

  - Made the column `productId` on table `sales` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `sales` MODIFY `productId` INTEGER NOT NULL;
