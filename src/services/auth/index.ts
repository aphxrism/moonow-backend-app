import { HttpStatusCodes } from '../../common/constants/httpStatusCodes'
import { OperationResult } from '../../common/interfaces/operationResult'
import { PortalError } from '../../utilities/error'
import { RegisterPayload } from '../../common/interfaces/payloads/auth'

export namespace AuthService {

    export async function register (body: RegisterPayload): Promise<OperationResult> {
        if (!body.email) {
            throw PortalError({
                code: 'errors.emailNotProvided',
                message: 'Email is not provided',
                source: 'AuthService.register()',
                status: HttpStatusCodes.BAD_REQUEST,
            })
        }

        return {
            success: true,
            data: body,
        };
    }

}