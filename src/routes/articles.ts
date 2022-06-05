import { AccountRoles } from '../common/constants/accountRoles'
import { ArticlesValidation, GeneralValidations } from '../common/validations'
import { ArticlesController } from '../controllers/articles'
import { Router } from '../middlewares/route'

export const ArticlesRouter = new Router('/articles')

ArticlesRouter.post('/', ArticlesController.postArticle)
    .configure({
        authorized: true,
        allowedRole: AccountRoles.WRITER,
    })
    .validate(ArticlesValidation)

ArticlesRouter.put('/', ArticlesController.putArticle)
    .configure({
        authorized: true,
        allowedRole: AccountRoles.WRITER,
    })
    .validate({
        ...ArticlesValidation,
        id: GeneralValidations.id,
    })

ArticlesRouter.delete('/', ArticlesController.deleteArticle)
    .configure({
        authorized: true,
        allowedRole: AccountRoles.WRITER,
    })
    .validate({
        id: GeneralValidations.id,
    })