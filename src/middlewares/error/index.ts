import { Request, Response } from "express"
import { ApiError } from "../../common/interfaces/apiError"
import { OperationResult } from "../../common/interfaces/operationResult"

export function ErrorMiddleware (err: any, request: Request, response: Response, next: any) {
    console.error(`${err.source} error: ${err.message}`)

    const result: OperationResult = {
        success: false,
        errors: [ err ],
    }
    response.status(err.status).send(result)
}