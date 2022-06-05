import { AccountRoles } from '../common/constants/accountRoles'
import { GeneralValidations } from '../common/validations'
import { ArticlesController } from '../controllers/articles'
import { Router } from '../middlewares/route'
import { ArticleContentTypes, IArticleContent } from '../common/interfaces/articleContent'

export const ArticlesRouter = new Router('/articles')

ArticlesRouter.post('/', ArticlesController.postArticle)
    .configure({
        authorized: true,
        allowedRole: AccountRoles.WRITER,
    })
    .validate({
        title: GeneralValidations.isNotEmpty,
        short_name: (value: string) => value ? true : false,
        content: (value: IArticleContent) => {
            if (value === null) return false

            for(const key in value) {
                if (value[key].content === undefined || value[key].type === undefined) return false

                if (!Object.keys(ArticleContentTypes).includes(value[key].type)) return false
            }
            return true
        },
    })