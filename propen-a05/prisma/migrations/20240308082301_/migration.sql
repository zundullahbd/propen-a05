/*
  Warnings:

  - Added the required column `babi` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `babi` VARCHAR(191) NOT NULL;
