import { sequelize } from '#helpers';
const { models } = sequelize;

export async function createVideogame(videogameData) {
  try {
    const { name, description, released, rating, platforms, image } = videogameData;
    const videogame = await models.Videogame.create({
      name,
      description,
      platforms,
      image,
      released,
      rating,
    })

    const videogameId = videogame.id;

    return {
      id: videogameId,
      ...videogameData,
    }
  } catch (error) {
    //
  }
}
