import express, { Express } from 'express'
import bodyParser from 'body-parser'
import { router } from './routes'
import 'reflect-metadata'
import { ErrorMiddleware } from './middlewares/error'
import { DatabaseInstance } from './database/postgres'

export abstract class Server {

    private static instance: Express
    private static PORT: number

    static getInstance() { 
        return this.instance 
    }

    static async init (): Promise<void> {
        this.PORT = parseInt(process.env.PORT) || 3000

        this.instance = express()

        this.initializeHandlers()
        await DatabaseInstance.initializeModels()

        Server.instance.listen(Server.PORT, () => {
            console.log(`Server it running at http://${process.env.HOSTNAME}:${Server.PORT}`)
        })
    }

    private static initializeHandlers () {
        this.instance.use(express.json())
        this.instance.use(bodyParser.urlencoded({ extended: false }))
        this.instance.use(bodyParser.json())
        this.instance.use('/api', router)
        
        this.instance.use(ErrorMiddleware)
    }

}