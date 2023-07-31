import { ValidationError } from 'sequelize';

export function logErrors (err, req, res, next) {
  console.error(err);
  next(err);
}

export function errorHandler(err, req, res, next) {
  res.status(400).json({
    message: err.message,
    stack: err.stack
  })
}

export function ormErrorHandler (err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    })
  }
  next(err)
}
