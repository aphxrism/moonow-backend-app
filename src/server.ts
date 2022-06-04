import 'reflect-metadata'
import { Container, Service } from 'typedi'
import express, { Express } from 'express'
import bodyParser from 'body-parser'
import { router } from './routes'
import { ErrorMiddleware } from './middlewares/error'
import { DatabaseInstance } from './database/postgres'

@Service()
export class Server {

    private static instance: Express
    private static PORT: number

    static getInstance() { 
        return this.instance
    }

    async init (): Promise<void> {
        Server.PORT = parseInt(process.env.PORT) || 3000

        Server.instance = express()

        Server.initializeHandlers()
        await Server.initializeConnections()

        Server.instance.listen(Server.PORT, async () => {
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

    private static async initializeConnections () {
        await DatabaseInstance.initializeModels()
        await DatabaseInstance.getConnection().sync()
    }

}