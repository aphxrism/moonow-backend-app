import { Router } from '../../middlewares/route'
import { CategoriesController } from '../../controllers/categories'

const CategoriesRouter = new Router('/categories')

CategoriesRouter.get('/', CategoriesController.getCategories)

export { CategoriesRouter }