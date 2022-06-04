import { AccountRoles } from './accountRoles'

export enum HttpMethods {
    PUT = 'PUT',
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS',
}

export interface IRouteEndpoints {
    authorized: boolean
    allowedRole?: AccountRoles
}