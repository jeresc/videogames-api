import { sequelize } from '#helpers';
const { models } = sequelize;

export async function createVideogame(videogameData) {
  const { name, description, released, rating, platforms, image, genres } =
    videogameData;

  if (!genres || genres.length < 1) throw new Error('Videogames must contain at least 1 genre');
  if (!name) throw new Error('Name is required');
  if (!description) throw new Error('Description is required');
  if (!released) throw new Error('Released is required');
  if (!rating) throw new Error('Rating is required');
  if (!platforms) throw new Error('Platforms are required');
  if (!image) throw new Error('Image is required');

  const videogame = await models.Videogame.create({
    name,
    description,
    platforms,
    image,
    released,
    rating,
  });

  await videogame.setGenres(genres)

  const videogameId = videogame.id;
  const videogameGenres = await videogame.getGenres();

  return {
    id: videogameId,
    ...videogameData,
    genres: videogameGenres
  };
}
