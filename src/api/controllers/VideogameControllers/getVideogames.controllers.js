import { findVideogames } from "#services";

export const getVideogames = async (req, res, next) => {
  try {
    const filters = req.query
    const videogames = await findVideogames(filters);

    if (!videogames.length) {
      return res.status(200).json([]);
    }

    res.status(200).json(videogames);
  } catch (error) {
    next(error)
  }
}
