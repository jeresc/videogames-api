import { updateVideogame } from "#services";

export const patchVideogame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const videogame = await updateVideogame(id, changes);
    res.status(200).json(videogame);
  } catch (error) {
    next(error);
  }
}
