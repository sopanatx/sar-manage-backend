/*
  Warnings:

  - Added the required column `TopicId` to the `FileUploadData` table without a default value. This is not possible if the table is not empty.
  - Made the column `index` on table `FileUploadData` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FileUploadData" ADD COLUMN     "TopicId" INTEGER NOT NULL,
ALTER COLUMN "index" SET NOT NULL,
ALTER COLUMN "index" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "FileUploadData" ADD FOREIGN KEY ("TopicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
