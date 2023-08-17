export const checkSession = async (req, res, next) => {
  try {
    return res.status(200).json({
      message: 'Login successful',
    })
  } catch (error) {
    next(error);
  }
};
