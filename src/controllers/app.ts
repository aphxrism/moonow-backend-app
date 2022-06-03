import { OperationResult } from "../common/interfaces/operationResult"
import { AppService } from "../services/app"

class AppController {

    static async getConfig(): Promise<OperationResult> {
        return await AppService.getConfig()
    }

}

export { AppController }