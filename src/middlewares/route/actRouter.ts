import console from 'console'
import { Request, Response } from 'express'
import { ErrorCodes } from '../../common/constants/errorCodes'
import { HttpStatusCodes } from '../../common/constants/httpStatusCodes'
import { PortalError } from '../../utilities/error'
import { Validations } from '../../validations'

export async function ActRouter (request: Request, response: Response, callBack: any, next: any): Promise<void> {
    try {
        let payload = request.body

        if (request.method === 'GET') payload = request.query

        if(Validations[request.method] !== undefined && Validations[request.method][request.url] !== undefined) {
            for (const key in payload) {
                if (!Validations[request.method][request.url][key](payload[key])) throw PortalError({
                    code: `${ErrorCodes.api.invalid}.${key}`,
                    message: `Field '${key}' has an invalid value [${payload[key]}]`,
                    status: HttpStatusCodes.BAD_REQUEST,
                    source: 'ActRouter()',
                })
            }
        }

        const result = await callBack(payload)
        
        response.status(HttpStatusCodes.OK).json(result)
    } catch (err) {
        next(err)
    }
}