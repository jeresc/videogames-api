import { sequelize } from '#helpers';

export async function getUsers() {
  try {
    const users = await sequelize.User.findAll();
    return users;
  } catch (error) {
    return [];
  }
}

