import config from '#config';
import fetch from 'node-fetch';
import { sequelize, mergeApiRequests } from '#helpers';
import { adaptVideogame } from '#adapters';
import { Op } from 'sequelize';
const { models } = sequelize;

export async function findVideogames(filters) {
  const name = filters.name || '';
  const page_size = +filters.page_size || 15;
  const page = (+filters.page - 1) * page_size || 0;

  if (page < 0) throw new Error('Page must be greater than 0');

  let apiData = [];
  let urls

  const options = {
    include: [
      { model: models.Genre, as: 'genres', through: { attributes: [] } },
    ],
    where: {},
  };

  if (name) {
    urls = [
      `${config.apiUrl}/games?search=${name}&key=${config.apiKey}`
    ]
    // apiData = [
    //   await fetch(
    //     `${config.apiUrl}/games?search=${name}&key=${config.apiKey}`,
    //   ).then(response => response.json()).then(result => result.results),
    // ];

    options.where.name = {
      [Op.iRegexp]: `${name.replace(' ', '|')}`,
    };
  } else {
    urls = [
      `${config.apiUrl}/games?page_size=40&key=${config.apiKey}`,
      `${config.apiUrl}/games?page_size=40&page=2&key=${config.apiKey}`,
      `${config.apiUrl}/games?page_size=20&page=5&key=${config.apiKey}`,
    ];

  }

  apiData = await mergeApiRequests(urls);
  const dbVideogames = await models.Videogame.findAll(options);
  const apiVideogames = await apiData.map(adaptVideogame) || [];

  let videogames = [...dbVideogames, ...apiVideogames];


  return videogames.slice(page, page + page_size);
}
