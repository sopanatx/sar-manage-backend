/*
  Warnings:

  - You are about to drop the column `semesterName` on the `FileUploadData` table. All the data in the column will be lost.
  - Added the required column `semesterId` to the `FileUploadData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subCategoryId` to the `FileUploadData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `SubCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FileUploadData" DROP CONSTRAINT "FileUploadData_semesterName_fkey";

-- AlterTable
ALTER TABLE "FileUploadData" DROP COLUMN "semesterName",
ADD COLUMN     "semesterId" TEXT NOT NULL,
ADD COLUMN     "subCategoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FileUploadData" ADD FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUploadData" ADD FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
