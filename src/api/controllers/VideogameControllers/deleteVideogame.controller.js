import { destroyVideogame } from "#services";

export const deleteVideogame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const videogame = await destroyVideogame(id);
    res.status(200).json(videogame);
  } catch (error) {
    next(error);
  }
} 
