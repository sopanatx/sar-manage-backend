-- AlterTable
ALTER TABLE "FileUploadData" ALTER COLUMN "deletedAt" DROP NOT NULL,
ALTER COLUMN "deletedAt" DROP DEFAULT;
