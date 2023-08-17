import { DataTypes, Model } from 'sequelize';

export const VIDEOGAME_TABLE = 'videogames';

export const VideogameSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(700),
    allowNull: false,
  },
  platforms: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  released: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0.00,
      max: 5.00
    }
  }
}

export class Videogame extends Model {

  static associate(models) {
    this.belongsToMany(models.Genre, {
      as: "genres",
      through: models.VideogameGenre,
      foreignKey: 'videogameId',
      otherKey: 'genreId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VIDEOGAME_TABLE,
      modelName: 'Videogame',
      timestamps: false
    }
  }
}
