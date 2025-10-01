/*
  Warnings:

  - You are about to drop the column `is_active` on the `tb_user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tb_user` DROP COLUMN `is_active`;

-- CreateTable
CREATE TABLE `tb_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `user_name` VARCHAR(100) NOT NULL,
    `location` ENUM('산업현장', '건설현장', '도심빌딩', '무인매장') NOT NULL,
    `sequence` ENUM('도난', '쓰러짐') NOT NULL,
    `camera` ENUM('RGB', 'IR', 'Depth') NOT NULL,
    `height` ENUM('3m', '3m~5m', '5m 초과') NOT NULL,
    `angle` ENUM('30', '45', '90') NOT NULL,
    `fov` ENUM('Ultrawide', 'Wide', 'Linear') NOT NULL,
    `upload_url` VARCHAR(255) NOT NULL,
    `create_url` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `tb_logs_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_logs` ADD CONSTRAINT `tb_logs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tb_user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
