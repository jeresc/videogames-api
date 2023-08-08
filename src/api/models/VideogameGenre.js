import { Model, DataTypes } from 'sequelize';

import { VIDEOGAME_TABLE, GENRE_TABLE } from '#models';

export const VIDEOGAME_GENRE_TABLE = 'videogames_genres';

export const VideogameGenreSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  videogameId: {
    field: 'videogame_id',
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: VIDEOGAME_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  genreId: {
    field: 'genre_id',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: GENRE_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
};

export class VideogameGenre extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: VIDEOGAME_GENRE_TABLE,
      modelName: 'VideogameGenre',
      timestamps: false,
    };
  }
}
