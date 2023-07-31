import { Router } from "express";
import { getVideogames, getVideogameById, postVideogame } from "#controllers";

const router = Router()

router.get("/", getVideogames)
router.get("/:id", getVideogameById)
router.post("/", postVideogame)

export default router
