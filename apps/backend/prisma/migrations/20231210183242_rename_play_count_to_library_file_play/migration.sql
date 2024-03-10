/*
  Warnings:

  - You are about to drop the `PlayCount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlayCount" DROP CONSTRAINT "PlayCount_libraryFileId_fkey";

-- DropForeignKey
ALTER TABLE "PlayCount" DROP CONSTRAINT "PlayCount_userId_fkey";

-- DropTable
DROP TABLE "PlayCount";

-- CreateTable
CREATE TABLE "LibraryFilePlay" (
    "id" TEXT NOT NULL,
    "playedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "libraryFileId" TEXT,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "LibraryFilePlay_id_key" ON "LibraryFilePlay"("id");

-- AddForeignKey
ALTER TABLE "LibraryFilePlay" ADD CONSTRAINT "LibraryFilePlay_libraryFileId_fkey" FOREIGN KEY ("libraryFileId") REFERENCES "LibraryFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryFilePlay" ADD CONSTRAINT "LibraryFilePlay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
