/*
  Warnings:

  - You are about to drop the column `categoryId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `_brandtocategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brandId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `brandId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `categoryId`,
    DROP COLUMN `productId`;

-- DropTable
DROP TABLE `_brandtocategory`;

-- CreateIndex
CREATE INDEX `Brand_salesId_idx` ON `Brand`(`salesId`);

-- CreateIndex
CREATE INDEX `Category_brandId_idx` ON `Category`(`brandId`);
