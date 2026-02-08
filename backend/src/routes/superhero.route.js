import { Router } from "express";
import {
  getAllSuperheroes,
  getSuperhero,
  createNewSuperhero,
  updateSuperheroController,
  deleteSuperheroController,
  uploadImages,
} from "../controllers/superhero.controller.js";
import { upload } from "../middlewares/upload.js";
import { deleteImage } from "../controllers/image.controller.js";

const router = Router();

router.get("/", getAllSuperheroes);
router.get("/:id", getSuperhero);
router.post("/", createNewSuperhero);
router.put("/:id", updateSuperheroController);
router.delete("/:id", deleteSuperheroController);
router.post("/:id/images", upload.array("images", 10), uploadImages);
router.delete("/:heroId/images/:imageId", deleteImage);

export default router;
