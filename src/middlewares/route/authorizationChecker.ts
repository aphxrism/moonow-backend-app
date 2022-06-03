import { JwtPayload } from 'jsonwebtoken'
import { AccessTokensModel } from '../../models/accessToken'
import { AccountsModel } from '../../models/accounts'
import { JsonWebToken } from '../../utilities/jsonWebToken'

export async function authorizationChecker (access_token: string | undefined): Promise<boolean> {
    if (!access_token) return false

    const foundToken = await AccessTokensModel.findOne({
        where: {
            access_token,
        },
    })
    if (!foundToken) return false

    const verifiedToken = JsonWebToken.verify(access_token) as JwtPayload
    if (!verifiedToken) return false

    const foundAccount = await AccountsModel.findOne({
        where: {
            id: foundToken.account_id,
        },
    })
    if (!foundAccount) return false

    if (verifiedToken.email !== foundAccount.email) return false

    return true
}