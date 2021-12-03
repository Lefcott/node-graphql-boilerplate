/*
  Warnings:

  - You are about to drop the column `betCoins` on the `userGames` table. All the data in the column will be lost.
  - You are about to drop the column `betResult` on the `userGames` table. All the data in the column will be lost.
  - Added the required column `currentBetCoins` to the `userGames` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentBetResult` to the `userGames` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userGames` DROP COLUMN `betCoins`,
    DROP COLUMN `betResult`,
    ADD COLUMN `currentBetCoins` INTEGER NOT NULL,
    ADD COLUMN `currentBetResult` VARCHAR(191) NOT NULL;
