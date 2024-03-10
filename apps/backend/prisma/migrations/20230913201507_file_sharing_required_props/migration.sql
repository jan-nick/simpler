/*
  Warnings:

  - Made the column `isDownloadPublic` on table `LibraryFile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isPublic` on table `LibraryFile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "LibraryFile" ALTER COLUMN "isDownloadPublic" SET NOT NULL,
ALTER COLUMN "isPublic" SET NOT NULL;
