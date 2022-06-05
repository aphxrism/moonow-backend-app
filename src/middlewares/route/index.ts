import { Router as ExpressRouter, Request, Response } from 'express'
import { HttpMethods, IRouteEndpoints } from '../../common/constants/routeEndpoints'
import { OperationResult } from '../../common/interfaces/operationResult'
import { Route } from '../../common/utilities/route'
import { ActRouter } from './actRouter'

type TCallBack = (...args: any) => Promise<OperationResult>

export class Router {

    expressRouter: ExpressRouter
    prefix: string

    constructor (prefix: string) {
        this.expressRouter = ExpressRouter()
        this.prefix = prefix
    }

    get =  (routePath: string, callBack: TCallBack) => {
        const route = new Route(this.prefix + routePath)

        this.expressRouter.get(route.routePath, async (request: Request, response: Response, next) => {
            return await ActRouter({
                route,
                request,
                response,
                callBack,
                next,
            })
        })

        return route
    }

    post = (routePath: string, callBack: TCallBack) => {
        const route = new Route(this.prefix + routePath)

        this.expressRouter.post(route.routePath, async (request: Request, response: Response, next) => {
            return await ActRouter({
                route,
                request,
                response,
                callBack,
                next,
            })
        })

        return route
    }

    put = (routePath: string, callBack: TCallBack) => {
        const route = new Route(this.prefix + routePath)

        this.expressRouter.put(route.routePath, async (request: Request, response: Response, next) => {
            return await ActRouter({
                route,
                request,
                response,
                callBack,
                next,
            })
        })

        return route
    }

    delete = (routePath: string, callBack: TCallBack) => {
        const route = new Route(this.prefix + routePath)

        this.expressRouter.delete(route.routePath, async (request: Request, response: Response, next) => {
            return await ActRouter({
                route,
                request,
                response,
                callBack,
                next,
            })
        })

        return route
    }

}