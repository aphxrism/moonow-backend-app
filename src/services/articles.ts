import { OperationResult } from "../common/interfaces/operationResult";
import { AccountsModel } from "../models/accounts";

export namespace ArticlesService {

    export async function postArticle (payload: string, account: AccountsModel): Promise<OperationResult> {
        return {
            success: true,
        }
    }

}