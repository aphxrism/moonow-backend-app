import { OperationResult } from '../../common/interfaces/operationResult'
import { AuthService } from '../../services/auth'
import { LoginPayload, RegisterPayload } from '../../common/interfaces/payloads/auth'

export namespace AuthController {

    export async function register (body: RegisterPayload): Promise<OperationResult> {
        return await AuthService.register(body)
    }

    export async function login (body: LoginPayload): Promise<OperationResult> {
        return await AuthService.login(body)
    }

}