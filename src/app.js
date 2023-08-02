import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from "#routes"
import { logErrors, errorHandler, ormErrorHandler } from "#middlewares";

const app = express()

const whitelist = ["https://videogames-app-jeresc.vercel.app/"]
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(morgan('dev'))
app.use(cors(options))
app.use(express.json())

routes(app)

app.use(logErrors)
app.use(ormErrorHandler)
app.use(errorHandler)

export default app
