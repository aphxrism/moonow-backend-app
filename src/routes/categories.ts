import { Router } from '../middlewares/route'
import { CategoriesController } from '../controllers/categories'
import { routeDefinitions } from '../common/constants/routeEndpoints'

const CategoriesRouter = new Router(routeDefinitions.categories)

CategoriesRouter.get('/', CategoriesController.getCategories)

export { CategoriesRouter }