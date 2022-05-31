import { Router as ExpressRouter, Request, Response } from 'express'
import { HttpStatusCodes } from '../../common/constants/httpStatusCodes'

export class Router {

    public expressRouter: ExpressRouter
    public prefix: string

    constructor (prefix: string) {
        this.expressRouter = ExpressRouter()
        this.prefix = prefix
    }

    static generalHandling = async (request: Request, response: Response, callback: any, next: any) => {
        try {
            let payload = request.body
            if (request.method === 'GET') payload = request.query
            
            const result = await callback(payload)
            response.status(HttpStatusCodes.OK).json(result)
        } catch (err) {
            next(err)
        }
    }

    get = async (route: string, callback: any) => {
        return this.expressRouter.get(this.prefix + route, async function (request: Request, response: Response, next) {
            return await Router.generalHandling(request, response, callback, next);
        })
    }

    post = async (route: string, callback: any) => {
        return this.expressRouter.post(this.prefix + route, async function (request: Request, response: Response, next) {
            return await Router.generalHandling(request, response, callback, next);
        })
    }

}