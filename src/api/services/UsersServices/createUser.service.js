import { sequelize } from '#helpers';

export async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const user = await sequelize.User.create({
      username,
      email,
      password
    })

    const userId = user.id

    return res.status(201).send({
      id: userId, ...req.body
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: "Internal server error" })
  }
}
