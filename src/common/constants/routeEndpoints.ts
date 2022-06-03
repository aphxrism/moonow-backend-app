const routeDefinitions = {
    auth: '/auth',
    register: '/register',
    login: '/login',
    categories: '/categories',
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
}