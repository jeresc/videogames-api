import { sequelize } from '#helpers';
const { models } = sequelize;

export async function destroyVideogame(id) {
  if (!id) throw new Error('ID is required'); 

  const dbVideogame = await models.Videogame.destroy({ where: { id } });
  return dbVideogame;
}
