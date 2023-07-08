/*
  Warnings:

  - The primary key for the `Apartment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `Apartment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Apartment` table. All the data in the column will be lost.
  - The `id` column on the `Apartment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `apartmentNumber` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floorNumber` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetNumber` to the `Apartment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Apartment" DROP CONSTRAINT "Apartment_pkey",
DROP COLUMN "address",
DROP COLUMN "name",
ADD COLUMN     "apartmentNumber" INTEGER NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "floorNumber" INTEGER NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "streetNumber" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roomNumber" INTEGER NOT NULL,
    "airConditionerExists" BOOLEAN NOT NULL,
    "airConditionerWorking" TEXT NOT NULL,
    "airConditionerAge" INTEGER NOT NULL,
    "airConditionerType" INTEGER NOT NULL,
    "dressExists" BOOLEAN NOT NULL,
    "dressType" TEXT NOT NULL,
    "comments" TEXT[],
    "interruptions" TEXT[],
    "apartmentId" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Window" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "windowNumber" INTEGER NOT NULL,
    "windowType" TEXT NOT NULL,
    "wingsAmount" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "thickness" INTEGER NOT NULL,
    "uk" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "glaze" TEXT NOT NULL,
    "windowMaterial" TEXT NOT NULL,
    "bars" BOOLEAN NOT NULL,
    "barsType" TEXT NOT NULL,
    "net" TEXT NOT NULL,
    "shutter" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "Window_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resident" (
    "id" SERIAL NOT NULL,
    "interactionType" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "apartmentId" INTEGER NOT NULL,

    CONSTRAINT "Resident_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Window" ADD CONSTRAINT "Window_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resident" ADD CONSTRAINT "Resident_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
