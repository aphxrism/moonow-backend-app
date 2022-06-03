import { JwtPayload } from "jsonwebtoken"
import { AccountsModel } from "../../models/account"
import { JsonWebToken } from "../../utilities/jsonWebToken"

export async function authorizationChecker (access_token: string | undefined): Promise<boolean> {
    if (!access_token) return false

    const foundAccount = await AccountsModel.findOne({
        where: {
            access_token,
        },
    })
    if (!foundAccount) return false

    const verifiedToken = JsonWebToken.verify(access_token) as JwtPayload
    if (!verifiedToken) return false


    if (verifiedToken.email !== foundAccount.email) return false

    return true
}