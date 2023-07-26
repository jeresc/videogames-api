import { Router } from 'express'
import homeRouter from './home.router.js'

const routes = (app) => {
  const router = Router()
  app.use('/api', router)
  router.use('/', homeRouter)
}

export default routes
