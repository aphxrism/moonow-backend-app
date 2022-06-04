import { AccountRoles } from '../common/constants/accountRoles'
import { ArticlesController } from '../controllers/articles'
import { Router } from '../middlewares/route'

export const ArticlesRouter = new Router('/articles')

ArticlesRouter.post('/', ArticlesController.postArticle).configure({
    authorized: true,
    allowedRole: AccountRoles.WRITER,
})