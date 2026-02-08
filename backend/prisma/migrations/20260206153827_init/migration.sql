/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Superhero` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_superheroId_fkey";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Superhero";

-- CreateTable
CREATE TABLE "superheroes" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "realName" TEXT NOT NULL,
    "originDescription" TEXT NOT NULL,
    "superpowers" TEXT NOT NULL,
    "catchPhrase" TEXT,

    CONSTRAINT "superheroes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "superheroId" INTEGER NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_superheroId_fkey" FOREIGN KEY ("superheroId") REFERENCES "superheroes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
