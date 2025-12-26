/*
  Warnings:

  - Added the required column `slug` to the `HelpArticle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN "notes" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HelpArticle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "helpCategoryId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "HelpArticle_helpCategoryId_fkey" FOREIGN KEY ("helpCategoryId") REFERENCES "HelpCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_HelpArticle" ("createdAt", "helpCategoryId", "id", "isActive", "sortOrder", "updatedAt") SELECT "createdAt", "helpCategoryId", "id", "isActive", "sortOrder", "updatedAt" FROM "HelpArticle";
DROP TABLE "HelpArticle";
ALTER TABLE "new_HelpArticle" RENAME TO "HelpArticle";
CREATE UNIQUE INDEX "HelpArticle_slug_key" ON "HelpArticle"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
