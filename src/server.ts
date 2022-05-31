import express from 'express'
import bodyParser from 'body-parser'
import { router } from './routes'
import { ErrorMiddleware } from './middlewares/error'

const Server = express()

Server.use(express.json())
Server.use(bodyParser.urlencoded({ extended: false }))
Server.use(bodyParser.json())
Server.use('/api', router)

Server.use(ErrorMiddleware)


export { Server }