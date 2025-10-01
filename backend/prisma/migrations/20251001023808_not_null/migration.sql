/*
  Warnings:

  - Made the column `sequence` on table `tb_logs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `tb_logs` MODIFY `sequence` ENUM('사고', '도난', '쓰러짐') NOT NULL;
