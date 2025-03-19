/*
  Warnings:

  - A unique constraint covering the columns `[abbreviation]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `abbreviation` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "abbreviation" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Subject_abbreviation_key" ON "Subject"("abbreviation");
