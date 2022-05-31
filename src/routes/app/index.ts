import { Router } from '../../middlewares/route'
import { AppController } from '../../controllers/app'

const AppRouter = new Router('/app')

AppRouter.get('/package.json', AppController.getConfig)

export { AppRouter }