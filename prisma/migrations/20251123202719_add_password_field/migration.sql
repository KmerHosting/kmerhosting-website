-- AlterTable
ALTER TABLE `user` ADD COLUMN `isPasswordSet` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `password` VARCHAR(191) NULL;
