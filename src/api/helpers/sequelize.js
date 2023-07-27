import config from '#config';
import { Sequelize } from 'sequelize';
import { setupModels } from '#helpers';

export const sequelize = new Sequelize(config.dbUrl, {
  dialect: 'postgres',
  logging: console.log,
})

setupModels(sequelize);

