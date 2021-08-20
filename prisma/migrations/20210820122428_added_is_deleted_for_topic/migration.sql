-- AlterTable
ALTER TABLE "Semester" ALTER COLUMN "isAvailable" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
