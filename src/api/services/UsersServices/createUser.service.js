import { sequelize } from '#helpers';
const { models } = sequelize;
import bcrypt from 'bcrypt';

export async function createUser(userData) {
  const { username, email, password } = userData;
  if (!username) throw new Error('Username is required');
  if (!email) throw new Error('Email is required');
  if (!password) throw new Error('Password is required');
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await models.User.create({
    username,
    email,
    password: hashedPassword,
  });

  delete user.dataValues.password;

  return user;
}
