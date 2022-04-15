import { Router } from "express"

import { AppRouter } from './app'

const router = Router()

router.use('/', AppRouter)

export { router };