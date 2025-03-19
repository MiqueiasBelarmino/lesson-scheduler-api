/*
  Warnings:

  - A unique constraint covering the columns `[abbreviation]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `abbreviation` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "abbreviation" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Course_abbreviation_key" ON "Course"("abbreviation");
