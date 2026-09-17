/*
  Warnings:

  - The primary key for the `acessories` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `acessories` DROP PRIMARY KEY,
    MODIFY `ID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ticket_messages` ADD COLUMN `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `role` ENUM('USER', 'ADMIN', 'MODERATOR', 'SUPERVISOR', 'OWNER', 'DEV') NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE `tickets` MODIFY `ticket_type` ENUM('admin_report', 'ban_appeal', 'ip_appeal', 'report') NOT NULL;
