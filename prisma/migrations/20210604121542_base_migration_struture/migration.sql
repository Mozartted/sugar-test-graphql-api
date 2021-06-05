-- CreateEnum
CREATE TYPE "Role" AS ENUM ('RESIDENT', 'ADMIN');

-- CreateTable
CREATE TABLE "Apartment" (
"id" SERIAL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Door" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "acme_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "apartment_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
"id" SERIAL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'RESIDENT',
    "email" TEXT NOT NULL,
    "apartment_id" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_residentials" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Apartment.name_unique" ON "Apartment"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Door.acme_id_unique" ON "Door"("acme_id");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_residentials_AB_unique" ON "_residentials"("A", "B");

-- CreateIndex
CREATE INDEX "_residentials_B_index" ON "_residentials"("B");

-- AddForeignKey
ALTER TABLE "Door" ADD FOREIGN KEY("apartment_id")REFERENCES "Apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY("apartment_id")REFERENCES "Apartment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_residentials" ADD FOREIGN KEY("A")REFERENCES "Door"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_residentials" ADD FOREIGN KEY("B")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
