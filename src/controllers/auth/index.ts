import { OperationResult } from '../../common/interfaces/operationResult'
import { AuthService } from '../../services/auth'
import { RegisterPayload } from '../../common/interfaces/payloads/auth'

export namespace AuthController {

    export async function register (body: RegisterPayload): Promise<OperationResult> {
        return await AuthService.register(body)
    }

}