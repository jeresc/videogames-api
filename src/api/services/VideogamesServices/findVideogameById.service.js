import config from '#config';
import fetch from 'node-fetch';
import { sequelize, validateUuid } from '#helpers';
import { adaptVideogame } from '#adapters';
const { models } = sequelize;

export async function findVideogameById(id) {
  if (!id) {
    throw new Error('ID is required');
  }

  const options = {
    include: [
      { model: models.Genre, as: 'genres', through: { attributes: [] } },
    ],
  };

  if (validateUuid(id)) {
    const dbVideogame = await models.Videogame.findByPk(id, options);
    return dbVideogame;
  } else {
    const apiVideogame = await fetch(
      `${config.apiUrl}/games/${id}?key=${config.apiKey}`,
    )
      .then(response => response.json())
      .then(videogame => adaptVideogame(videogame));
    return apiVideogame;
  }
}
