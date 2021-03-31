-- CreateEnum
CREATE TYPE "UserLevel" AS ENUM ('ADMIN', 'STUDENT', 'TEACHER');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "passwordSalt" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userLevel" TEXT,
    "fullname" TEXT,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordReset" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "resetPasswordToken" TEXT NOT NULL,
    "requested" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Semester" (
    "id" TEXT NOT NULL,
    "semesterName" TEXT NOT NULL,
    "isAvaliable" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,
    "isAvailable" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" SERIAL NOT NULL,
    "subCategoryName" TEXT NOT NULL,
    "subCategoryDescription" TEXT NOT NULL,
    "isAvailable" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "FileUploadData" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "semesterName" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account.username_unique" ON "Account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordReset.resetPasswordToken_unique" ON "PasswordReset"("resetPasswordToken");

-- CreateIndex
CREATE UNIQUE INDEX "Semester.id_unique" ON "Semester"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Semester.semesterName_unique" ON "Semester"("semesterName");

-- CreateIndex
CREATE UNIQUE INDEX "Category.id_unique" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory.id_unique" ON "SubCategory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FileUploadData.id_unique" ON "FileUploadData"("id");

-- AddForeignKey
ALTER TABLE "FileUploadData" ADD FOREIGN KEY ("semesterName") REFERENCES "Semester"("id") ON DELETE CASCADE ON UPDATE CASCADE;
