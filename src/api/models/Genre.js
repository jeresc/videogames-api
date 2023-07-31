import { DataTypes, Model } from 'sequelize';

export const GENRE_TABLE = 'genres';

export const GenreSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

export class Genre extends Model {
  
  static associate(models) {
    this.belongsToMany(models.Videogame, {
      as: "videogames",
      through: models.VideogameGenre,
      foreignKey: 'genreId',
      otherKey: 'videogameId' 
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: GENRE_TABLE,
      modelName: 'Genre',
      timestamps: false
    }
  }
}
