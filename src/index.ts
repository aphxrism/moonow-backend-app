import { Server } from './server'

require('dotenv').config({path: require('path').resolve(__dirname, '../.env')})

Server.init()