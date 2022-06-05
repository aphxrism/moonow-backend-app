import { Router } from 'express'

import { AppRouter } from './app'
import { ArticlesRouter } from './articles'
import { AuthRouter } from './auth'
import { CategoriesRouter } from './categories'

export const router = Router()

router.use('/', AppRouter.expressRouter)
router.use('/', AuthRouter.expressRouter)
router.use('/', ArticlesRouter.expressRouter)
router.use('/', CategoriesRouter.expressRouter)