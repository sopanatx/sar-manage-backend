/*
  Warnings:

  - You are about to drop the column `isAvaliable` on the `Semester` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PasswordReset" ADD COLUMN     "isValid" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Semester" DROP COLUMN "isAvaliable",
ADD COLUMN     "isAvailable" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "NavigationMenu" (
    "id" INTEGER NOT NULL,
    "navigationName" TEXT,
    "navigationUrl" TEXT,
    "assignedRole" "UserLevel",
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ChildrenNavigationMenu" (
    "id" INTEGER NOT NULL,
    "childrenName" TEXT,
    "childrenUrl" TEXT,
    "assignedRole" "UserLevel",
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "NavigationMenuId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "NavigationMenu.id_unique" ON "NavigationMenu"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ChildrenNavigationMenu.id_unique" ON "ChildrenNavigationMenu"("id");

-- AddForeignKey
ALTER TABLE "ChildrenNavigationMenu" ADD FOREIGN KEY ("NavigationMenuId") REFERENCES "NavigationMenu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
