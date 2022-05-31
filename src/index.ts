require('dotenv').config({path: require('path').resolve(__dirname, '../.env')})

import { Server } from './server'
import * as http from 'http'

const HOSTNAME: string = process.env.HOSTNAME || '127.0.0.1'
const PORT: number = process.env.PORT || 3000

const server: http.Server = http.createServer(Server)

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running at http://${HOSTNAME}:${PORT}/...`)
})