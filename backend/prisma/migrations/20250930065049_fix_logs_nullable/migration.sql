/*
  Warnings:

  - Made the column `location` on table `tb_logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sequence` on table `tb_logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `camera` on table `tb_logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `height` on table `tb_logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `angle` on table `tb_logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fov` on table `tb_logs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `tb_logs` MODIFY `location` ENUM('산업현장', '건설현장', '도심빌딩', '무인매장') NOT NULL,
    MODIFY `sequence` ENUM('도난', '쓰러짐') NOT NULL,
    MODIFY `camera` ENUM('RGB', 'IR', 'Depth') NOT NULL,
    MODIFY `height` ENUM('3m', '3m~5m', '5m 초과') NOT NULL,
    MODIFY `angle` ENUM('30', '45', '90') NOT NULL,
    MODIFY `fov` ENUM('Ultrawide', 'Wide', 'Linear') NOT NULL;
