import { Router } from '../middlewares/route'
import { AuthController } from '../controllers/auth'
import { routeDefinitions } from '../common/constants/routeEndpoints'

const AuthRouter = new Router(routeDefinitions.auth)

AuthRouter.post('/register', AuthController.register)
AuthRouter.post('/login', AuthController.login)

export { AuthRouter }