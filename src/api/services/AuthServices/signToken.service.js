import jwt from 'jsonwebtoken';
import config from '#config';

export const signToken = async user => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  };

  const token = jwt.sign(payload, config.jwtSecret);

  return token
};
