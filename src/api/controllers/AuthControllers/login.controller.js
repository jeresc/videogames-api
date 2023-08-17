import { signToken } from '#services';
import { serialize } from 'cookie';
import config from '#config';

export const login = async (req, res, next) => {
  try {
    const user = req.user;
    const token = await signToken(req.user);

    const serialized = serialize('login_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24,
      path: '/',
    });
    res.setHeader('Set-Cookie', serialized);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
