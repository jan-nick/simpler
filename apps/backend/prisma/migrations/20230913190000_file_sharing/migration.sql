-- AlterTable
ALTER TABLE "LibraryFile" ADD COLUMN     "isDownloadPublic" BOOLEAN DEFAULT false,
ADD COLUMN     "isPublic" BOOLEAN DEFAULT false;
