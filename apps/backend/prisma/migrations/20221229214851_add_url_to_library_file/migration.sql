/*
  Warnings:

  - Added the required column `url` to the `LibraryFile` table without a default value. This is not possible if the table is not empty.

*/

DELETE FROM "LibraryFile";
-- AlterTable
ALTER TABLE "LibraryFile" ADD COLUMN     "url" TEXT NOT NULL;
