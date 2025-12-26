-- CreateTable
CREATE TABLE "MagnetPrice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sizeSlug" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "DeliveryOption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryOption_slug_key" ON "DeliveryOption"("slug");
