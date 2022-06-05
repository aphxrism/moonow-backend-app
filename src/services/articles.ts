import { ErrorCodes } from "../common/constants/errorCodes";
import { HttpStatusCodes } from "../common/constants/httpStatusCodes";
import { OperationResult } from "../common/interfaces/operationResult";
import { PostArticlePayload } from "../common/interfaces/payloads/articles";
import { PortalError } from "../common/utilities/error";
import { AccountsModel } from "../models/accounts";
import { ArticlesModel } from "../models/article";
import { CategoriesModel } from "../models/category";

export namespace ArticlesService {

    export async function postArticle (payload: PostArticlePayload, account: AccountsModel): Promise<OperationResult> {
        const category = await CategoriesModel.findOne({
            where: {
                short_name: payload.short_name,
            },
        })

        if (!category) throw PortalError({
            code: ErrorCodes.api.categoryNotFound,
            status: HttpStatusCodes.NOT_FOUND,
            message: `Category [${payload.short_name}] is not found`,
            source: 'ArticlesService.postArticle()',
        })

        const article = await ArticlesModel.create({
            title: payload.title,
            category_id: category.id,
            account_id: account.id,
            content: payload.content,
        })
        
        return {
            success: true,
            data: {
                article_id: article.id,
            },
        }
    }

}