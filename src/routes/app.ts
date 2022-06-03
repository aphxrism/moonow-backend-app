import { Router } from '../middlewares/route'
import { AppController } from '../controllers/app'
import { routeDefinitions } from '../common/constants/routeEndpoints'

const AppRouter = new Router(routeDefinitions.app)

AppRouter.get('/package.json', AppController.getConfig)

export { AppRouter }