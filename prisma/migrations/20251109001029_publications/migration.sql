-- CreateTable
CREATE TABLE `Publication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `authors` JSON NOT NULL,
    `venue` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'journal',
    `topic` VARCHAR(191) NOT NULL DEFAULT 'other',
    `citations` INTEGER NOT NULL DEFAULT 0,
    `impactFactor` DOUBLE NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `url` VARCHAR(191) NULL DEFAULT '',
    `abstract` TEXT NULL,
    `doi` VARCHAR(191) NULL DEFAULT '',
    `pdfUrl` VARCHAR(191) NULL DEFAULT '',
    `bibtex` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Publication_title_year_key`(`title`, `year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
