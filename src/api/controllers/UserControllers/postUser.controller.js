import { createUser } from "#services"

export const postUser = async (req, res) => {
  try {
    const user = await createUser(req, res)
    res.send(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error creating user" })
  }
}
