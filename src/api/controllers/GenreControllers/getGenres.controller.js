import { listGenres } from "#services";

export const getGenres = async (req, res, next) => {
  try {
    const genres = await listGenres();
    res.status(200).json(genres);
  } catch (error) {
    next(error);
  }
}
