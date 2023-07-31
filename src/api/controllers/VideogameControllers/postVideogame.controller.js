import { createVideogame } from "#services";

export const postVideogame = async (req, res, next) => {
  try {
    const videogame = await createVideogame(req.body);
    res.status(201).json(videogame);
  } catch (error) {
    next(error);
  }
}
