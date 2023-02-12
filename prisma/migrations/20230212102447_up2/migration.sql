/*
  Warnings:

  - The primary key for the `Avatars` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userID` on the `Avatars` table. All the data in the column will be lost.
  - Added the required column `idA` to the `Avatars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Avatars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Avatars" DROP CONSTRAINT "Avatars_pkey",
DROP COLUMN "userID",
ADD COLUMN     "idA" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Avatars_pkey" PRIMARY KEY ("idA");

-- AddForeignKey
ALTER TABLE "Avatars" ADD CONSTRAINT "Avatars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
