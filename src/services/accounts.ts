import { ErrorCodes } from '../common/constants/errorCodes'
import { HttpStatusCodes } from '../common/constants/httpStatusCodes'
import { OperationResult } from '../common/interfaces/operationResult'
import { AccountsPayload } from '../common/interfaces/payloads/accounts'
import { PortalError } from '../common/utilities/error'
import { AccountsModel } from '../models/accounts'

export namespace AccountsService {

    export async function get (payload: AccountsPayload): Promise<OperationResult> {
        const foundAccount = await AccountsModel.findByPk(payload.id, {
            attributes: ['user_name'],
            raw: true,
        })

        if (!foundAccount) {
            throw PortalError({
                code: ErrorCodes.api.accountNotFound,
                status: HttpStatusCodes.NOT_FOUND,
                message: `User [ID = ${payload.id}] is not found`,
                source: 'AccountsService.get()',
            })
        }

        return {
            success: true,
            data: {
                ...foundAccount,
            },
        }
    }

}