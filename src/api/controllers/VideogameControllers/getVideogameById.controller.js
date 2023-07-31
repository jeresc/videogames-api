import { findVideogameById } from "#services";

export const getVideogameById = async (req, res, next) => {
  try {
    const { id } = req.params
    const videogame = await findVideogameById(id);
    res.status(200).json(videogame);
  } catch (error) {
    next(error);
  }
}
