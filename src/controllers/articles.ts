import { OperationResult } from '../common/interfaces/operationResult'
import { PostArticlePayload } from '../common/interfaces/payloads/articles'
import { AccountsModel } from '../models/accounts'
import { ArticlesService } from '../services/articles'

export namespace ArticlesController {

    export async function postArticle (payload: PostArticlePayload, account: AccountsModel): Promise<OperationResult> {
        return ArticlesService.postArticle(payload, account)
    }

}