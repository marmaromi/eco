/*
  Warnings:

  - You are about to drop the column `userId` on the `Apartment` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Resident` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Resident` table. All the data in the column will be lost.
  - You are about to drop the column `interactionType` on the `Resident` table. All the data in the column will be lost.
  - Added the required column `split` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Resident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Resident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobilePhoneNumber` to the `Resident` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `airConditionerWorking` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Apartment" DROP CONSTRAINT "Apartment_userId_fkey";

-- AlterTable
ALTER TABLE "Apartment" DROP COLUMN "userId",
ADD COLUMN     "split" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Resident" DROP COLUMN "content",
DROP COLUMN "date",
DROP COLUMN "interactionType",
ADD COLUMN     "comments" TEXT[],
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "homePhoneNumber" TEXT,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "mobilePhoneNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "airConditionerWorking",
ADD COLUMN     "airConditionerWorking" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "ResidentInteractions" (
    "id" SERIAL NOT NULL,
    "interactionType" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "residentId" INTEGER,

    CONSTRAINT "ResidentInteractions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResidentInteractions" ADD CONSTRAINT "ResidentInteractions_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE SET NULL ON UPDATE CASCADE;
