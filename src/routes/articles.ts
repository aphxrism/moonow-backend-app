import { routeDefinitions } from '../common/constants/routeEndpoints'
import { ArticlesController } from '../controllers/articles'
import { Router } from '../middlewares/route'

const ArticlesRouter = new Router(routeDefinitions.articles)

ArticlesRouter.post('/', ArticlesController.postArticle)

export { ArticlesRouter }