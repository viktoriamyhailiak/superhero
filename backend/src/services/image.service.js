import prisma from "../utils/prisma.js";

export const deleteImageByHero = async (heroId, imageId) => {
  const image = await prisma.image.findFirst({
    where: {
      id: imageId,
      superheroId: heroId,
    },
  });

  if (!image) {
    throw new Error("Image not found");
  }

  await prisma.image.delete({
    where: {
      id: imageId,
    },
  });

  return image;
};
