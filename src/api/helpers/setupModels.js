import { User, UserSchema } from "#models";

export function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
}

