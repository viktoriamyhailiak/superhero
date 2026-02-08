import {
  getSuperheroes,
  getSuperheroById,
  createSuperhero,
  updateSuperhero,
  deleteSuperhero,
  addImages,
} from "../services/superhero.service.js";

export const getAllSuperheroes = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const heroes = await getSuperheroes(page, limit);
    res.json(heroes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load heroes" });
  }
};

export const getSuperhero = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const hero = await getSuperheroById(id);

    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    res.json(hero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load hero" });
  }
};

export const createNewSuperhero = async (req, res) => {
  try {
    const hero = await createSuperhero(req.body);
    res.status(201).json(hero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create hero" });
  }
};

export const updateSuperheroController = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const hero = await updateSuperhero(id, req.body);
    res.json(hero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update hero" });
  }
};

export const deleteSuperheroController = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await deleteSuperhero(id);

    res.json({ message: "Superhero deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete hero" });
  }
};


export const uploadImages = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const hero = await addImages(id, req.files);
    res.json(hero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload images" });
  }
};