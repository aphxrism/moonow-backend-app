import { Router } from "express"

import { AppRouter } from './app'
import { AuthRouter } from "./auth"

const router = Router()

router.use('/', AppRouter.expressRouter)
router.use('/', AuthRouter.expressRouter)

export { router };