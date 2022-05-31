require('dotenv').config({path: require('path').resolve(__dirname, '../.env')})

import { Server } from './server'
import * as http from 'http'
import { DatabaseInstance } from './database/postgres'

const HOSTNAME: string = process.env.HOSTNAME || '127.0.0.1'
const PORT: number = process.env.PORT || 3000

const server: http.Server = http.createServer(Server)

server.listen(PORT, HOSTNAME, async () => {
    await DatabaseInstance.initializeModels()
    console.log(`Server is running at http://${HOSTNAME}:${PORT}/...`)
})