/*
  Warnings:

  - Added the required column `categoryId` to the `FileUploadData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FileUploadData" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FileUploadData" ADD FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
