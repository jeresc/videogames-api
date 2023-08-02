import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from "#routes"
import { logErrors, errorHandler, ormErrorHandler } from "#middlewares";

const app = express()

// const whitelist = ["http://localhost:3000", "https://videogames-app-jeresc.vercel.app/"]

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

routes(app)

app.use(logErrors)
app.use(ormErrorHandler)
app.use(errorHandler)

export default app
