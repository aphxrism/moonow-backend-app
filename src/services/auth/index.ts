import { OperationResult } from '../../common/interfaces/operationResult'
import { RegisterPayload } from '../../common/interfaces/payloads/auth'
import { PortalError } from '../../utilities/error'
import { Password } from '../../utilities/password'
import { RegisterValidation } from '../../validations/register'
import bcrypt from 'bcrypt'
import { AccountsModel } from '../../models/account'

export namespace AuthService {

    export async function register (body: RegisterPayload): Promise<OperationResult> {
        const validationResult = RegisterValidation(body, 'AuthService.register()')
        if (validationResult !== null) throw PortalError(validationResult)
        
        const hash = await Password.hash(body.password)

        const createdAccount = AccountsModel.create({

        })

        return {
            success: true,
            data: {
                ...body,
                user: createdAccount,
            },
        };
    }

}