-- AlterTable
ALTER TABLE `tb_logs` MODIFY `sequence` ENUM('사고', '도난', '쓰러짐') NULL;

-- AlterTable
ALTER TABLE `tb_user_setting` MODIFY `sequence` ENUM('사고', '도난', '쓰러짐') NOT NULL;
