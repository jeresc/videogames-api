import { Sequelize } from 'sequelize';

import config from "#config";
import setupModels from "#models";

const sequelize = new Sequelize(config.dbUrl, {
  dialect: 'postgres',
  logging: false
});

setupModels(sequelize);

export default sequelize
