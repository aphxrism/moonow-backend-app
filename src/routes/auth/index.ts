import { Router } from '../../middlewares/route'
import { AuthController } from '../../controllers/auth'

const AuthRouter = new Router('/auth')

AuthRouter.post('/register', AuthController.register)

export { AuthRouter }