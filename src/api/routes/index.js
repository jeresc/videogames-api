import { Router } from 'express'
import genresRouter from './genres.router.js'
import videogamesRouter from './videogames.router.js'
import usersRouter from './users.router.js'
import authRouter from './auth.router.js'

const routes = (app) => {
  const router = Router()
  app.use('/api', router)
  router.use('/videogames', videogamesRouter)
  router.use('/genres', genresRouter)
  router.use('/users', usersRouter)
  router.use('/auth', authRouter)
}

export default routes
