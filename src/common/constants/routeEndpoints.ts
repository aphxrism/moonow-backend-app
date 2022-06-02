const routeDefinitions = {
    auth: '/auth',
    register: '/register',
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
    } 
}

export const routeEndpoints: IRouteEndpoints = {
    register: {
        path: `${routeDefinitions.auth}${routeDefinitions.register}`,
        method: HttpMethods.POST,
    }
}