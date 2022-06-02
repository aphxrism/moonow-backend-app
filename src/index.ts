require('dotenv').config({path: require('path').resolve(__dirname, '../.env')})

import { Server } from './server'
import { Container } from 'typedi'

Container.get(Server).init().catch((err: any) => console.error(err))