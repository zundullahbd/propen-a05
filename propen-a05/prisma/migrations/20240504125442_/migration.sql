-- CreateTable
CREATE TABLE `Brand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NOT NULL,
    `service` VARCHAR(191) NULL,
    `facebook` VARCHAR(191) NULL,
    `instagram` VARCHAR(191) NULL,
    `twitter` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `salesId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Brand_salesId_idx`(`salesId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `brandId` INTEGER NOT NULL,

    INDEX `Category_brandId_idx`(`brandId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `brandId` INTEGER NOT NULL,

    INDEX `Product_brandId_idx`(`brandId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `productSalesId` INTEGER NOT NULL,
    `category` VARCHAR(191) NOT NULL DEFAULT '',
    `description` VARCHAR(191) NOT NULL DEFAULT '',
    `status` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
