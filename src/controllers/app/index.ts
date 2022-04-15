import { Request, Response } from "express"
import { HttpStatusCodes } from "../../common/constants/httpStatusCodes"

class AppController {

    public static getConfig(request: Request, response: Response) {
        const config = require('../../../package.json')
        response.status(HttpStatusCodes.OK).json(config)
    }

}

export { AppController }