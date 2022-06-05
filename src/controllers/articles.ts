import { OperationResult } from '../common/interfaces/operationResult'
import { PostArticlePayload, PutArticlePayload } from '../common/interfaces/payloads/articles'
import { AccountsModel } from '../models/accounts'
import { ArticlesService } from '../services/articles'

export namespace ArticlesController {

    export async function postArticle (payload: PostArticlePayload, account: AccountsModel): Promise<OperationResult> {
        return ArticlesService.postArticle(payload, account)
    }

    export async function putArticle (payload: PutArticlePayload, account: AccountsModel): Promise<OperationResult> {
        return ArticlesService.putArticle(payload, account)
    }

}