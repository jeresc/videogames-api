import { sequelize } from '#helpers';
const { models } = sequelize;

export async function updateVideogame(id, changes) {
  if (!id) throw new Error('ID is required');

  const updatedVideogame = await models.Videogame.update(changes, {
    where: { id },
  });

  return updatedVideogame;
}
