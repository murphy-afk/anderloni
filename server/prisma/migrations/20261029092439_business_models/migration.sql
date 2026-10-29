-- CreateTable
CREATE TABLE `Series` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `cover` VARCHAR(191) NULL,
    `position` INTEGER NOT NULL,

    UNIQUE INDEX `Series_slug_key`(`slug`),
    UNIQUE INDEX `Series_position_key`(`position`),
    INDEX `Series_category_idx`(`category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Work` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `seriesId` INTEGER NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `year` VARCHAR(191) NOT NULL,
    `dimensionsPrimary` VARCHAR(191) NULL,
    `dimensionsSecondary` VARCHAR(191) NULL,
    `thumb` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `video` BOOLEAN NOT NULL DEFAULT false,
    `missingSource` BOOLEAN NOT NULL DEFAULT false,
    `position` INTEGER NOT NULL,

    INDEX `Work_seriesId_position_idx`(`seriesId`, `position`),
    UNIQUE INDEX `Work_seriesId_slug_key`(`seriesId`, `slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CriticalText` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `languages` JSON NOT NULL,
    `position` INTEGER NOT NULL,

    UNIQUE INDEX `CriticalText_slug_key`(`slug`),
    UNIQUE INDEX `CriticalText_position_key`(`position`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inquiry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `message` MEDIUMTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Work` ADD CONSTRAINT `Work_seriesId_fkey` FOREIGN KEY (`seriesId`) REFERENCES `Series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
