import { Router } from 'express'
import homeRouter from './home.router.js'
import userRouter from './user.router.js'

const routes = (app) => {
  const router = Router()
  app.use('/api', router)
  router.use('/', homeRouter)
  router.use("/users", userRouter)
}

export default routes
