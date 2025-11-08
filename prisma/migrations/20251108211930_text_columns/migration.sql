-- AlterTable
ALTER TABLE `Award` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `ContactMessage` MODIFY `message` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Experience` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Patent` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `ResearchProject` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `SiteSettings` MODIFY `heroDescription` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Talk` MODIFY `description` TEXT NOT NULL;
