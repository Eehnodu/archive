/*
  Warnings:

  - You are about to drop the column `create_at` on the `tb_user` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `tb_user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tb_user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `tb_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_email]` on the table `tb_user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_email` to the `tb_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `tb_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `tb_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_password` to the `tb_user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `tb_user_email_key` ON `tb_user`;

-- AlterTable
ALTER TABLE `tb_user` DROP COLUMN `create_at`,
    DROP COLUMN `email`,
    DROP COLUMN `name`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `user_email` VARCHAR(255) NOT NULL,
    ADD COLUMN `user_id` VARCHAR(50) NOT NULL,
    ADD COLUMN `user_name` VARCHAR(100) NOT NULL,
    ADD COLUMN `user_password` VARCHAR(255) NOT NULL,
    ADD COLUMN `user_role` ENUM('USER', 'COMPANY', 'ADMIN') NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `tb_user_token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jti` VARCHAR(128) NOT NULL,
    `token_hash` VARCHAR(255) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `revoked` BOOLEAN NOT NULL DEFAULT false,
    `user_agent` VARCHAR(255) NULL,
    `ip` VARCHAR(45) NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `last_used_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `tb_user_token_jti_key`(`jti`),
    INDEX `tb_user_token_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `tb_user_user_id_key` ON `tb_user`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `tb_user_user_email_key` ON `tb_user`(`user_email`);

-- CreateIndex
CREATE INDEX `tb_user_user_email_idx` ON `tb_user`(`user_email`);

-- CreateIndex
CREATE INDEX `tb_user_user_id_idx` ON `tb_user`(`user_id`);

-- AddForeignKey
ALTER TABLE `tb_user_token` ADD CONSTRAINT `tb_user_token_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tb_user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
