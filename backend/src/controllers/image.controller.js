import { deleteImageByHero } from '../services/image.service.js';

export const deleteImage = async (req, res) => {
  const { heroId, imageId } = req.params;

  try {
    await deleteImageByHero(
      Number(heroId),
      Number(imageId)
    );

    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(404).json({ message: e.message });
  }
};

