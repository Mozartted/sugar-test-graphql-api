/*
  Warnings:

  - The migration will change the primary key for the `Apartment` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will change the primary key for the `Door` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will change the primary key for the `User` table. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Door" DROP CONSTRAINT "Door_apartment_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_apartment_id_fkey";

-- DropForeignKey
ALTER TABLE "_residentials" DROP CONSTRAINT "_residentials_A_fkey";

-- DropForeignKey
ALTER TABLE "_residentials" DROP CONSTRAINT "_residentials_B_fkey";

-- AlterTable
ALTER TABLE "Apartment" DROP CONSTRAINT "Apartment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Apartment_id_seq";

-- AlterTable
ALTER TABLE "Door" DROP CONSTRAINT "Door_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "apartment_id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Door_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "apartment_id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "_residentials" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Door" ADD FOREIGN KEY("apartment_id")REFERENCES "Apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY("apartment_id")REFERENCES "Apartment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_residentials" ADD FOREIGN KEY("A")REFERENCES "Door"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_residentials" ADD FOREIGN KEY("B")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
