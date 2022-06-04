import { OperationResult } from "../common/interfaces/operationResult";

export namespace AppService {

    export async function getConfig (): Promise<OperationResult> {
        const data = require('../../package.json')

        return {
            success: true,
            data: data ? data : '',
        }
    }

}