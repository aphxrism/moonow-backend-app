import { Router } from '../middlewares/route'
import { AuthController } from '../controllers/auth'
import { GeneralValidations } from '../common/validations'

export const AuthRouter = new Router('/auth')

AuthRouter.post('/register', AuthController.register)
    .configure({ 
        authorized: false 
    })
    .validate({
        email: GeneralValidations.email,
        password: GeneralValidations.password,
        user_name: (value: string) => value.length > 0 && typeof value === 'string',
    })

AuthRouter.post('/login', AuthController.login)
    .configure({
        authorized: false,
    })
    .validate({
        email: GeneralValidations.email,
        password: GeneralValidations.password,
    })