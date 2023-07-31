import config from '#config';
import { sequelize } from '#helpers';
import { adaptVideogame } from '#adapters';
import { Op } from 'sequelize';
const { models } = sequelize;

export async function findVideogames(filters) {
  try {
    const options = {
      include: ["genres"],
      where: {}
    };
    const name = filters.name ?? '';

    if (name) {
      options.where.name = {
        [Op.iRegexp]: `${name.replace(' ', '|')}`,
      };
    }

    const dbVideogames = await models.Videogame.findAll(options);

    const apiData = await fetch(
      `${config.apiUrl}/games?search=${name}&key=${config.apiKey}`,
    ).then(response => response.json());

    const apiVideogames = await apiData.results.map(adaptVideogame);

    return [ ...dbVideogames, ...apiVideogames];
  } catch (error) {
    //
  }
}
