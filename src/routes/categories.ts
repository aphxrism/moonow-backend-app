import { Router } from '../middlewares/route'
import { CategoriesController } from '../controllers/categories'

export const CategoriesRouter = new Router('/categories')

CategoriesRouter.get('/', CategoriesController.getCategories).configure({
    authorized: true,
})