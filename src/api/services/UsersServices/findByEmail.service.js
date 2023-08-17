import { sequelize } from '#helpers';
const { models } = sequelize;

export async function findByEmail(email) {
  if (!email) throw new Error('Email is required');
  const user = await models.User.findOne({ where: { email } });
  return user;
}
