-- CreateTable
CREATE TABLE "Superhero" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "realName" TEXT NOT NULL,
    "originDescription" TEXT NOT NULL,
    "superpowers" TEXT NOT NULL,
    "catchPhrase" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Superhero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "superheroId" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_superheroId_fkey" FOREIGN KEY ("superheroId") REFERENCES "Superhero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
