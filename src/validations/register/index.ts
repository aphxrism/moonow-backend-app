import validator from 'validator'
import { IValidator } from '../../common/interfaces/validator'

export const RegistrationValidator: IValidator = {
    email: (value: string) => validator.isEmail(value),
    password: (value: string) => value.length > 0,
}