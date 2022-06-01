import { ErrorCodes } from '../common/constants/errorCodes'
import { HttpStatusCodes } from '../common/constants/httpStatusCodes'
import { ApiError } from '../common/interfaces/apiError'
import { RegisterPayload } from '../common/interfaces/payloads/auth'
import validator from 'validator'

export function RegisterValidation (body: RegisterPayload, source: string): ApiError | null {
    if (!validator.isEmail(body.email)) return {
        code: ErrorCodes.api.invalidEmail,
        message: 'Given email value is invalid',
        source: source,
        status: HttpStatusCodes.BAD_REQUEST,
    }

    if (!body.password) return {
        code: ErrorCodes.api.invalidPassword,
        message: 'Given password value is invalid',
        source: source,
        status: HttpStatusCodes.BAD_REQUEST,
    }

    return null
}