import {
  Genre,
  GenreSchema,
  Videogame,
  VideogameSchema,
  VideogameGenre,
  VideogameGenreSchema,
} from '#models';

export function setupModels(sequelize) {
  Genre.init(GenreSchema, Genre.config(sequelize));
  Videogame.init(VideogameSchema, Videogame.config(sequelize));
  VideogameGenre.init(VideogameGenreSchema, VideogameGenre.config(sequelize));

  Genre.associate(sequelize.models);
  Videogame.associate(sequelize.models);
}
