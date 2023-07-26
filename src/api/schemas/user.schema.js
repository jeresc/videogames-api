import Joi from 'joi'

const id = Joi.number().integer()
const email = Joi.string().email()
const username = Joi.string().alphanum().min(3).max(22)
const password = Joi.string().min(8)

export const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  username: username.required(),
})

export const updateUserSchema = Joi.object({
  email: email,
  username: username,
})

export const getUserSchema = Joi.object({
  id: id.required(),
})
