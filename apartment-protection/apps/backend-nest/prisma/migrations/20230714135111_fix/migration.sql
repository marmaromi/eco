/*
  Warnings:

  - You are about to drop the column `windowMaterial` on the `Window` table. All the data in the column will be lost.
  - Added the required column `material` to the `Window` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Window" DROP COLUMN "windowMaterial",
ADD COLUMN     "material" TEXT NOT NULL;
