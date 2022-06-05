import validator from 'validator'
import { IValidator } from './interfaces/validator'

export const GeneralValidations: IValidator = {

    email: (value: string) => validator.isEmail(value),
    password: (value: string) => value.length > 0,
    isNotEmpty: (value: string) => value.length > 0,

}