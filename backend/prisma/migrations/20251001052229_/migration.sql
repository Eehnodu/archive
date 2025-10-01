/*
  Warnings:

  - You are about to drop the column `video_title` on the `tb_logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tb_logs` DROP COLUMN `video_title`,
    ADD COLUMN `create_title` VARCHAR(255) NOT NULL DEFAULT 'Untitled video';
