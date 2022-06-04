import { AccountRoles } from "../constants/accountRoles";
import { HttpMethods, IRouteEndpoints } from "../constants/routeEndpoints";
import { IValidator } from "../interfaces/validator";

export class Route {

    routePath: string
    settings: IRouteEndpoints
    validation: IValidator

    constructor (routePath: string) {
        this.routePath = routePath
        this.settings = {
            authorized: false,
            allowedRole: AccountRoles.READER,
        }
        this.validation = {}
    }

    validate = (validation: IValidator): Route => {
        this.validation = validation

        return this
    }

    configure = (settings: IRouteEndpoints): Route => {
        this.settings = settings

        return this
    }

}