import console from 'console'
import { Request, Response } from 'express'
import { ErrorCodes } from '../../common/constants/errorCodes'
import { HttpStatusCodes } from '../../common/constants/httpStatusCodes'
import { routeEndpoints } from '../../common/constants/routeEndpoints'
import { PortalError } from '../../utilities/error'
import { Validations } from '../../validations'
import { authorizationChecker } from './authorizationChecker'

export async function ActRouter (request: Request, response: Response, callBack: any, next: any): Promise<void> {
    try {
        let payload = request.body
        let foundAccount = null

        request.url = request.url.replace(/\/+$/, '')

        if (request.method === 'GET') payload = request.query

        for(const key in routeEndpoints) {
            if (routeEndpoints[key].path === request.url 
                && routeEndpoints[key].method === request.method 
                && routeEndpoints[key].authorized
            ) {
                foundAccount = await authorizationChecker(request.headers.authorization)
                if (!foundAccount) {
                    throw PortalError({
                        code: `${ErrorCodes.api.invalidToken}`,
                        message: `Unauthorized attempt`,
                        status: HttpStatusCodes.UNAUTHORIZED,
                        source: 'ActRouter()',
                    })
                }
                break
            }
        }

        if(Validations[request.method] !== undefined && Validations[request.method][request.url] !== undefined) {
            for (const key in Validations[request.method][request.url]) {
                if (payload[key] === undefined) {
                    throw PortalError({
                        code: `${ErrorCodes.api.invalid}.${key}`,
                        message: `Field '${key}' has an undefined value`,
                        status: HttpStatusCodes.BAD_REQUEST,
                        source: 'ActRouter()',
                    })
                }
                if (!Validations[request.method][request.url][key](payload[key])) {
                    throw PortalError({
                        code: `${ErrorCodes.api.invalid}.${key}`,
                        message: `Field '${key}' has an invalid value [${payload[key]}]`,
                        status: HttpStatusCodes.BAD_REQUEST,
                        source: 'ActRouter()',
                    })
                }
            }
        }

        const result = await callBack(payload, foundAccount)
        
        response.status(HttpStatusCodes.OK).json(result)
    } catch (err) {
        next(err)
    }
}