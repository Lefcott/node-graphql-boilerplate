/*
  Warnings:

  - You are about to drop the column `gameId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `UserGame` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `gameId`;

-- DropTable
DROP TABLE `UserGame`;

-- CreateTable
CREATE TABLE `userGames` (
    `userId` INTEGER NOT NULL,
    `gameId` INTEGER NOT NULL,
    `betResult` VARCHAR(191) NOT NULL,
    `betCoins` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `gameId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
