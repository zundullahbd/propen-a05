/*
  Warnings:

  - Added the required column `createdTime` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` ADD COLUMN `createdTime` VARCHAR(191) NOT NULL,
    ADD COLUMN `date` VARCHAR(191) NOT NULL;
