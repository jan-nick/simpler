-- CreateTable
CREATE TABLE "LibraryItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "LibraryItem_id_key" ON "LibraryItem"("id");
