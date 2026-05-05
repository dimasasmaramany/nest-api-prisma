/*
  Warnings:

  - You are about to alter the column `image` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `image` JSON NOT NULL;
