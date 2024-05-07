/*
  Warnings:

  - You are about to drop the column `createdTime` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `productSalesId` on the `ticket` table. All the data in the column will be lost.
  - You are about to alter the column `category` on the `ticket` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to alter the column `status` on the `ticket` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - Added the required column `updatedAt` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salesId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` DROP COLUMN `createdTime`,
    DROP COLUMN `date`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `ticket` DROP COLUMN `productSalesId`,
    ADD COLUMN `salesId` INTEGER NOT NULL,
    MODIFY `category` ENUM('KOMPLAIN', 'INFORMASI', 'GARANSI') NOT NULL DEFAULT 'KOMPLAIN',
    MODIFY `status` ENUM('SUBMITTED', 'REVIEWED', 'INPROGRESS', 'RESOLVED', 'CLOSED') NOT NULL DEFAULT 'SUBMITTED';

-- CreateTable
CREATE TABLE `Sales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `outlet` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `referenceNumber` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `createdTime` VARCHAR(191) NOT NULL,
    `due` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `payment` VARCHAR(191) NOT NULL,
    `fulfillment` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,

    INDEX `Sales_customerId_idx`(`customerId`),
    INDEX `Sales_productId_idx`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stars` INTEGER NOT NULL,
    `review` VARCHAR(191) NULL,
    `attitude` BOOLEAN NOT NULL DEFAULT false,
    `speed` BOOLEAN NOT NULL DEFAULT false,
    `communication` BOOLEAN NOT NULL DEFAULT false,
    `outcome` BOOLEAN NOT NULL DEFAULT false,
    `efficiency` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `ticketId` INTEGER NOT NULL,

    UNIQUE INDEX `Review_ticketId_key`(`ticketId`),
    INDEX `Review_ticketId_idx`(`ticketId`),
    INDEX `Review_customerId_idx`(`customerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Ticket_customerId_idx` ON `Ticket`(`customerId`);

-- CreateIndex
CREATE INDEX `Ticket_salesId_idx` ON `Ticket`(`salesId`);
