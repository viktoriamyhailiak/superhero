import prisma from "../utils/prisma.js";

export const getSuperheroes = async (page = 1, limit = 5) => {
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.superhero.findMany({
      skip,
      take: limit,
      include: {
        images: {
          take: 1,
        },
      },
      orderBy: {
        id: "desc",
      },
    }),
    prisma.superhero.count(),
  ]);

  return {
    items,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getSuperheroById = async (id) => {
  return prisma.superhero.findUnique({
    where: { id },
    include: { images: true },
  });
};

export const createSuperhero = async (data) => {
  return prisma.superhero.create({
    data,
    include: { images: true },
  });
};

export const updateSuperhero = async (id, data) => {
  return prisma.superhero.update({
    where: { id },
    data,
    include: { images: true },
  });
};

export const deleteSuperhero = async (id) => {
  await prisma.image.deleteMany({
    where: { superheroId: id },
  });

  return prisma.superhero.delete({
    where: { id },
  });
};


export const addImages = async (id, files) => {
  return prisma.superhero.update({
    where: { id },
    data: {
      images: {
        create: files.map((file) => ({
          url: `/uploads/${file.filename}`,
        })),
      },
    },
    include: { images: true },
  });
};
