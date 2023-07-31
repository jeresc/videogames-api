import { Router } from 'express'
import homeRouter from './home.router.js'
import genresRouter from './genres.router.js'
import videogamesRouter from './videogames.router.js'

const routes = (app) => {
  const router = Router()
  app.use('/api', router)
  router.use('/', homeRouter)
  router.use('/videogames', videogamesRouter)
  router.use('/genres', genresRouter)
}

export default routes
