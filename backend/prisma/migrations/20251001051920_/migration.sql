/*
  Warnings:

  - You are about to drop the column `image_title` on the `tb_logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tb_logs` DROP COLUMN `image_title`,
    ADD COLUMN `upload_title` VARCHAR(255) NOT NULL DEFAULT 'Untitled image';
