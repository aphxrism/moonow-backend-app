import { OperationResult } from '../../common/interfaces/operationResult'
import { LoginPayload, RegisterPayload } from '../../common/interfaces/payloads/auth'
import { PortalError } from '../../utilities/error'
import { Password } from '../../utilities/password'
import { AccountsModel } from '../../models/account'
import { ErrorCodes } from '../../common/constants/errorCodes'
import { HttpStatusCodes } from '../../common/constants/httpStatusCodes'
import { JsonWebToken } from '../../utilities/jsonWebToken'

export namespace AuthService {

    export async function register (body: RegisterPayload): Promise<OperationResult> {
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

        await AccountsModel.create({
            email: body.email,
            hash,
        })

        return {
            success: true,
        }
    }

    export async function login (body: LoginPayload): Promise<OperationResult> {
        const foundUser = await AccountsModel.findOne({
            where: {
                email: body.email,
            },
        })
        if (!foundUser) {
            throw PortalError({
                message: `User with email ${body.email} is not found`,
                code: ErrorCodes.api.userNotFound,
                source: 'AuthService.login()',
                status: HttpStatusCodes.NOT_FOUND,
            })
        }

        const token = JsonWebToken.generate(body.email)
        if (!token) {
            throw PortalError({
                message: `Token for user [ID = ${foundUser.id}] is failed to generate`,
                code: ErrorCodes.api.failedToGenerateToken,
                source: 'AuthService.login()',
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            })
        }

        foundUser.update({
            access_token: token,
        })

        return {
            success: true,
            data: {
                token,
            },
        }
    }

}