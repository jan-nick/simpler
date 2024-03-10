-- CreateTable
CREATE TABLE "PlayCount" (
    "id" TEXT NOT NULL,
    "playedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "libraryFileId" TEXT,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayCount_id_key" ON "PlayCount"("id");

-- AddForeignKey
ALTER TABLE "PlayCount" ADD CONSTRAINT "PlayCount_libraryFileId_fkey" FOREIGN KEY ("libraryFileId") REFERENCES "LibraryFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayCount" ADD CONSTRAINT "PlayCount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
