import config from '#config';
import fetch from 'node-fetch';
import { sequelize } from '#helpers';
import { adaptGenre } from '#adapters';
const { models } = sequelize;

export async function listGenres() {
  const dbGenres = await models.Genre.findAll({
    include: ['videogames'],
  });

  if (dbGenres.length) return dbGenres;

  const apiData = await fetch(
    `${config.apiUrl}/genres?key=${config.apiKey}`,
  ).then(response => response.json());

  const apiGenres = await apiData.results.map(adaptGenre);

  await models.Genre.bulkCreate(apiGenres);

  return apiGenres;
}
