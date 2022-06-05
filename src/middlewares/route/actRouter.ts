import { Request, Response } from 'express'
import { AccountRoles } from '../../common/constants/accountRoles'
import { ErrorCodes } from '../../common/constants/errorCodes'
import { HttpStatusCodes } from '../../common/constants/httpStatusCodes'
import { PortalError } from '../../common/utilities/error'
import { Route } from '../../common/utilities/route'
import { authorizationChecker } from './authorizationChecker'

interface ActRouterInput {
    route: Route
    request: Request
    response: Response
    callBack: any
    next: any
}

export async function ActRouter (input: ActRouterInput): Promise<void> {
    const {
        route,
        request,
        response,
        callBack,
        next,
    }: ActRouterInput = input

    try {

        let payload = request.body
        let foundAccount = null

        if (request.method === 'GET') payload = request.query

        if (route.settings.authorized) {
            foundAccount = await authorizationChecker(request.headers.authorization)
            if (!foundAccount) {
                throw PortalError({
                    code: `${ErrorCodes.api.invalidToken}`,
                    message: `Unauthorized attempt`,
                    status: HttpStatusCodes.UNAUTHORIZED,
                    source: `ActRouter => ${route.routePath}`,
                })
            }

            if (
                (route.settings.allowedRole === AccountRoles.WRITER && foundAccount.role === AccountRoles.READER)
                || (route.settings.allowedRole === AccountRoles.ADMIN && foundAccount.role !== AccountRoles.ADMIN)
            ) {
                throw PortalError({
                    code: `${ErrorCodes.api.accessDenied}`,
                    message: `Access for the role [${foundAccount.role}] was denied. Needed [${route.settings.allowedRole}] as minimum`,
                    status: HttpStatusCodes.UNAUTHORIZED,
                    source: `ActRouter => ${route.routePath}`,
                })
            }
        }

        for (const key in route.validation) {
            if (payload[key] === undefined) {
                throw PortalError({
                    code: `${ErrorCodes.api.invalid}.${key}`,
                    message: `Field '${key}' has an undefined value`,
                    status: HttpStatusCodes.BAD_REQUEST,
                    source: 'ActRouter()',
                })
            }

            if (!route.validation[key](payload[key])) {
                throw PortalError({
                    code: `${ErrorCodes.api.invalid}.${key}`,
                    message: `Field '${key}' has an invalid value [${(typeof payload[key] === 'object' ? JSON.stringify(payload[key]) : payload[key])}]`,
                    status: HttpStatusCodes.BAD_REQUEST,
                    source: 'ActRouter()',
                })
            }
        }

        const result = await callBack(payload, foundAccount)
        
        response.status(HttpStatusCodes.OK).json(result)
    } catch (err) {
        next(err)
    }
}