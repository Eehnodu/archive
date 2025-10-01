-- AlterTable
ALTER TABLE `tb_user` ADD COLUMN `image_count` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true,
    ALTER COLUMN `update_at` DROP DEFAULT;
