import { AccountRoles } from "./accountRoles"

export const routeDefinitions = {
    auth: '/auth',
    app: '/app',
    register: '/register',
    login: '/login',
    categories: '/categories',
    articles: '/articles',
}

export enum HttpMethods {
    PUT = 'PUT',
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS',
}

interface IRouteEndpoints { 
    [key: string]: {
        path: string
        method: HttpMethods
        authorized: boolean
        allowedRole?: AccountRoles
    } 
}

export const routeEndpoints: IRouteEndpoints = {
    register: {
        path: `${routeDefinitions.auth}${routeDefinitions.register}`,
        method: HttpMethods.POST,
        authorized: false,
    },
    login: {
        path: `${routeDefinitions.auth}${routeDefinitions.login}`,
        method: HttpMethods.POST,
        authorized: false,
    },
    getCategories: {
        path: `${routeDefinitions.categories}`,
        method: HttpMethods.GET,
        authorized: false,
    },
    postArticle: {
        path: `${routeDefinitions.articles}`,
        method: HttpMethods.POST,
        authorized: true,
        allowedRole: AccountRoles.WRITER,
    },
}