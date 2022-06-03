import { OperationResult } from "../common/interfaces/operationResult";

export namespace AppService {

    export async function getConfig (): Promise<OperationResult> {
        return {
            success: true,
            data: require('../../../package.json'),
        }
    }

}