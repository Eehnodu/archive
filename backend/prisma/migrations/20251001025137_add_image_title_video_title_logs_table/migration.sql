-- AlterTable
ALTER TABLE `tb_logs` ADD COLUMN `image_title` VARCHAR(255) NOT NULL DEFAULT 'Untitled image',
    ADD COLUMN `video_title` VARCHAR(255) NOT NULL DEFAULT 'Untitled video';
