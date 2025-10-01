-- AlterTable
ALTER TABLE `tb_logs` MODIFY `location` ENUM('산업현장', '건설현장', '도심빌딩', '무인매장') NULL,
    MODIFY `sequence` ENUM('도난', '쓰러짐') NULL,
    MODIFY `camera` ENUM('RGB', 'IR', 'Depth') NULL,
    MODIFY `height` ENUM('3m', '3m~5m', '5m 초과') NULL,
    MODIFY `angle` ENUM('30', '45', '90') NULL,
    MODIFY `fov` ENUM('Ultrawide', 'Wide', 'Linear') NULL;

-- CreateTable
CREATE TABLE `tb_sample` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `sample_url` VARCHAR(255) NOT NULL,
    `time` INTEGER NOT NULL DEFAULT 0,
    `category` ENUM('카테고리1', '카테고리2', '카테고리3') NULL,
    `price` INTEGER NOT NULL DEFAULT 0,
    `discount` INTEGER NOT NULL DEFAULT 0,
    `definition` ENUM('4K', 'HD', 'Full HD') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
