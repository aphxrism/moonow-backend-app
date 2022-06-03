import { Router } from 'express'

import { AppRouter } from './app'
import { AuthRouter } from './auth'
import { CategoriesRouter } from './categories'

const router = Router()

router.use('/', AppRouter.expressRouter)
router.use('/', AuthRouter.expressRouter)
router.use('/', CategoriesRouter.expressRouter)

export { router };