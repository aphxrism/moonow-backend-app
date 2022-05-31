import { ApiError } from './apiError'

export interface OperationResult {
    success: boolean
    data?: any
    errors?: ApiError;
}