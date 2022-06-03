import { OperationResult } from "../common/interfaces/operationResult";
import { AccountsModel } from "../models/accounts";
import { ArticlesService } from "../services/articles";

export namespace ArticlesController {

    export async function postArticle (payload: string, account: AccountsModel): Promise<OperationResult> {
        return ArticlesService.postArticle(payload, account)
    }

}