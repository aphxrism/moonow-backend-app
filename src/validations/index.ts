import { HttpMethods, routeEndpoints } from '../common/constants/routeEndpoints'
import { IValidator } from '../common/interfaces/validator'
import validator from 'validator'

const preparedValidations = {

    email: (value: string) => validator.isEmail(value),
    password: (value: string) => value.length > 0,

}

export const Validations: { [key: string]: { [key: string]: IValidator } } = {

    [HttpMethods.POST]: {

        [routeEndpoints.register.path]: {
            email: preparedValidations.email,
            password: preparedValidations.password,
        },

        [routeEndpoints.login.path]: {
            email: preparedValidations.email,
            password: preparedValidations.password,
        },

    },

}