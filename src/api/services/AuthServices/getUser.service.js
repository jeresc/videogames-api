import { sequelize } from '#helpers';
import { findByEmail } from '#services';
import bcrypt from 'bcrypt';

export const getUser = async (email, password) => {
  if (!email) throw new Error('Email is required');
  if (!password) throw new Error('Password is required');

  const user = await findByEmail(email);

  if (!user) throw new Error('Unathorized');

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error('Unathorized');

  return user;
};
