import { HttpStatusCodes } from '../constants/httpStatusCodes'

export interface ApiError {
    code: string
    status: HttpStatusCodes
    message: string
    source: string
}