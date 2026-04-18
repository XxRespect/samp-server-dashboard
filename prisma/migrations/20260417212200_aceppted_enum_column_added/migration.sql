-- AlterTable
ALTER TABLE `tickets` MODIFY `status` ENUM('open', 'closed', 'accepted', 'denied') NULL DEFAULT 'open';
