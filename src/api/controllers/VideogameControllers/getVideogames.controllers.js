import { findVideogames } from "#services";

export const getVideogames = async (req, res, next) => {
  try {
    const filters = req.query
    const videogames = await findVideogames(filters);

    if (!videogames.results.length) {
      return res.status(200).json({
        count: 0,
        results: []
      });
    }

    res.status(200).json(videogames);
  } catch (error) {
    next(error)
  }
}
