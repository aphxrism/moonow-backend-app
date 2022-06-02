import { HttpMethods, routeEndpoints } from '../common/constants/routeEndpoints'
import { IValidator } from '../common/interfaces/validator'
import { RegistrationValidator } from './register'

export const Validations: { [key: string]: { [key: string]: IValidator } } = {

    [HttpMethods.POST]: {
        [routeEndpoints.register.path]: RegistrationValidator,
    },
    
}