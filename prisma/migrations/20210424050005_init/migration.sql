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
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    "requested" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Semester" (
    "id" TEXT NOT NULL,
    "semesterName" TEXT NOT NULL,
    "isAvailable" BOOLEAN DEFAULT false,
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
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "FileUploadData" (
    "id" TEXT NOT NULL,
    "index" INTEGER,
    "filename" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "subCategoryId" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "NavigationMenu" (
    "id" SERIAL NOT NULL,
    "navigationName" TEXT,
    "navigationUrl" TEXT,
    "assignedRole" "UserLevel",
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ChildrenNavigationMenu" (
    "id" SERIAL NOT NULL,
    "childrenName" TEXT,
    "childrenUrl" TEXT,
    "childrenDetails" TEXT,
    "assignedRole" "UserLevel",
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "NavigationMenuId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "topicName" TEXT,
    "topicDetails" TEXT,
    "subCategoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
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

-- CreateIndex
CREATE UNIQUE INDEX "NavigationMenu.id_unique" ON "NavigationMenu"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ChildrenNavigationMenu.id_unique" ON "ChildrenNavigationMenu"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Topic.id_unique" ON "Topic"("id");

-- AddForeignKey
ALTER TABLE "SubCategory" ADD FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUploadData" ADD FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUploadData" ADD FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildrenNavigationMenu" ADD FOREIGN KEY ("NavigationMenuId") REFERENCES "NavigationMenu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
