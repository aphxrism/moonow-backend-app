import { OperationResult } from '../../common/interfaces/operationResult'
import { RegisterPayload } from '../../common/interfaces/payloads/auth'
import { PortalError } from '../../utilities/error'
import { Password } from '../../utilities/password'
import { RegisterValidation } from '../../validations/register'
import { AccountsModel } from '../../models/account'
import { ErrorCodes } from '../../common/constants/errorCodes'
import { HttpStatusCodes } from '../../common/constants/httpStatusCodes'

export namespace AuthService {

    export async function register (body: RegisterPayload): Promise<OperationResult> {
        const validationResult = RegisterValidation(body, 'AuthService.register()')
        if (validationResult !== null) throw PortalError(validationResult)

        const foundUser = await AccountsModel.findOne({
            where: {
                email: body.email,
            },
        })

        if (foundUser) {
            throw PortalError({
                message: `User with email ${body.email} is already exists`,
                code: ErrorCodes.api.emailExists,
                source: 'AuthService.register()',
                status: HttpStatusCodes.BAD_REQUEST,
            })
        }
        
        const hash = await Password.hash(body.password)

        const createdAccount = await AccountsModel.create({
            email: body.email,
            hash,
        })

        return {
            success: true,
            data: {
                user: createdAccount.id,
            },
        };
    }

}