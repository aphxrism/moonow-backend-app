import validator from 'validator'

export const GeneralValidations = {

    email: (value: string) => validator.isEmail(value),
    password: (value: string) => value.length > 0,

}