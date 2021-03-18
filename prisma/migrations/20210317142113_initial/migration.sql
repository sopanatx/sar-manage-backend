-- CreateEnum
CREATE TYPE "userLevel" AS ENUM ('ADMIN', 'STUDENT', 'TEACHER');

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
CREATE TABLE "listMenu" (
    "id" TEXT NOT NULL,
    "menuName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "semester" (
    "id" TEXT NOT NULL,
    "semesterName" TEXT NOT NULL,
    "isAvaliable" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "primaryMenu" (
    "id" TEXT NOT NULL,
    "primaryName" TEXT NOT NULL,
    "isAvaliable" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "subMenu" (
    "id" TEXT NOT NULL,
    "subMenuName" TEXT NOT NULL,
    "primaryMenuId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account.username_unique" ON "Account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "listMenu.id_unique" ON "listMenu"("id");

-- CreateIndex
CREATE UNIQUE INDEX "semester.id_unique" ON "semester"("id");

-- CreateIndex
CREATE UNIQUE INDEX "semester.semesterName_unique" ON "semester"("semesterName");

-- CreateIndex
CREATE UNIQUE INDEX "primaryMenu.id_unique" ON "primaryMenu"("id");

-- CreateIndex
CREATE UNIQUE INDEX "primaryMenu.primaryName_unique" ON "primaryMenu"("primaryName");

-- CreateIndex
CREATE UNIQUE INDEX "subMenu.id_unique" ON "subMenu"("id");

-- CreateIndex
CREATE UNIQUE INDEX "subMenu.subMenuName_unique" ON "subMenu"("subMenuName");

-- AddForeignKey
ALTER TABLE "subMenu" ADD FOREIGN KEY ("primaryMenuId") REFERENCES "primaryMenu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
