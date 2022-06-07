import { OperationResult } from '../common/interfaces/operationResult'
import { LoginPayload, RegisterPayload } from '../common/interfaces/payloads/auth'
import { PortalError } from '../common/utilities/error'
import { Password } from '../common/utilities/password'
import { AccountsModel } from '../models/accounts'
import { ErrorCodes } from '../common/constants/errorCodes'
import { HttpStatusCodes } from '../common/constants/httpStatusCodes'
import { JsonWebToken } from '../common/utilities/jsonWebToken'
import { AccessTokensModel } from '../models/accessToken'
import { v4 as uuidv4 } from 'uuid'

export namespace AuthService {

    export async function register (body: RegisterPayload): Promise<OperationResult> {
        const foundAccountEmail = await AccountsModel.findOne({ where: { email: body.email } })
        if (foundAccountEmail) {
            throw PortalError({
                message: `Account with email ${body.email} is already exists`,
                code: ErrorCodes.api.emailExists,
                source: 'AuthService.register()',
                status: HttpStatusCodes.BAD_REQUEST,
            })
        }
        
        const hash = await Password.hash(body.password)
        const uuid = uuidv4()

        await AccountsModel.create({
            id: uuid,
            user_name: `0x${uuid}`,
            email: body.email,
            hash,
        })

        return {
            success: true,
        }
    }

    export async function login (body: LoginPayload): Promise<OperationResult> {
        const foundAccount = await AccountsModel.findOne({
            where: {
                email: body.email,
            },
        })
        if (!foundAccount) {
            throw PortalError({
                message: `Account with email ${body.email} is not found`,
                code: ErrorCodes.api.accountNotFound,
                source: 'AuthService.login()',
                status: HttpStatusCodes.NOT_FOUND,
            })
        }

        if (!await Password.compare(body.password, foundAccount.hash)) {
            throw PortalError({
                message: `Wrong password for the account [ID = ${foundAccount.id}]`,
                code: ErrorCodes.api.wrongPassword,
                source: 'AuthService.login()',
                status: HttpStatusCodes.BAD_REQUEST,
            })
        }

        const token = JsonWebToken.generate(body.email)
        if (!token) {
            throw PortalError({
                message: `Token for account [ID = ${foundAccount.id}] is failed to generate`,
                code: ErrorCodes.api.failedToGenerateToken,
                source: 'AuthService.login()',
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            })
        }

        await AccessTokensModel.create({
            access_token: token,
            account_id: foundAccount.id,
        })

        return {
            success: true,
            data: {
                token,
            },
        }
    }

}