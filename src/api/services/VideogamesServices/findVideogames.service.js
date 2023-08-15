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
  const order = filters.order || 'name_asc';
  const filter = filters.filter || 'none';
  const genres = filters.genres || [];

  if (page < 0) throw new Error('Page must be greater than 0');

  let apiData = [];
  let urls;

  const options = {
    include: [
      { model: models.Genre, as: 'genres', through: { attributes: [] } },
    ],
    where: {},
  };

  if (name) {
    urls = [`${config.apiUrl}/games?search=${name}&key=${config.apiKey}`];
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
      `${config.apiUrl}/games?page_size=40&page=3&key=${config.apiKey}`,
    ];
  }

  apiData = await mergeApiRequests(urls);
  const dbVideogames = await models.Videogame.findAll(options);
  const apiVideogames = (await apiData.map(adaptVideogame)) || [];

  let videogames = [...dbVideogames, ...apiVideogames];

  const sortOptions = {
    name_asc: (a, b) => a.name.localeCompare(b.name),
    name_desc: (a, b) => b.name.localeCompare(a.name),
    rating_asc: (a, b) => a.rating - b.rating,
    rating_desc: (a, b) => b.rating - a.rating,
  };

  const filterOptions = {
    byOrigin: {
      none: game => game,
      api: game => typeof game.id === 'number',
      db: game => typeof game.id !== 'number',
    },
    byGenres: genres => game =>
      genres.length
        ? game.genres.some(genre => genres.includes(genre.name))
        : game,
  };

  const requestedVideogames = videogames
      .filter(filterOptions.byOrigin[filter])
      .filter(filterOptions.byGenres(genres))
      .sort(sortOptions[order])

  return {
    count: requestedVideogames.length,
    results: requestedVideogames
      .slice(page, page + page_size),
  };
}
