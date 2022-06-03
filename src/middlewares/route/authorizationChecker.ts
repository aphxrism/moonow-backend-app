import { JwtPayload } from 'jsonwebtoken'
import { AccessTokensModel } from '../../models/accessToken'
import { AccountsModel } from '../../models/accounts'
import { JsonWebToken } from '../../utilities/jsonWebToken'

export async function authorizationChecker (access_token: string | undefined): Promise<AccountsModel | null> {
    if (!access_token) return null

    const foundToken = await AccessTokensModel.findOne({
        where: {
            access_token,
        },
    })
    if (!foundToken) return null

    const verifiedToken = JsonWebToken.verify(access_token) as JwtPayload
    if (!verifiedToken) return null

    const foundAccount = await AccountsModel.findOne({
        where: {
            id: foundToken.account_id,
        },
    })
    if (!foundAccount) return null

    if (verifiedToken.email !== foundAccount.email) return null

    return foundAccount
}