import { Router as ExpressRouter, Request, Response } from 'express'
import { OperationResult } from '../../common/interfaces/operationResult'
import { ActRouter } from './actRouter'

type TCallBack = (...args: any) => Promise<OperationResult>

export class Router {

    public expressRouter: ExpressRouter
    public prefix: string

    constructor (prefix: string) {
        this.expressRouter = ExpressRouter()
        this.prefix = prefix
    }

    get = async (route: string, callBack: TCallBack) => {
        return this.expressRouter.get(this.prefix + route, async function (request: Request, response: Response, next) {
            return await ActRouter(request, response, callBack, next)
        })
    }

    post = async (route: string, callBack: TCallBack) => {
        return this.expressRouter.post(this.prefix + route, async function (request: Request, response: Response, next) {
            return await ActRouter(request, response, callBack, next)
        })
    }

}