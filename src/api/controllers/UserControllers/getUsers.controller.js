import { getUsers } from "#services"

export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers()
    res.send(users)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: "Internal server error" })
  }
}
