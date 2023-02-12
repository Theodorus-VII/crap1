/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Avatars` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Avatars_userId_key" ON "Avatars"("userId");
