import { Router } from '../middlewares/route'
import { CategoriesController } from '../controllers/categories'
import { AccountRoles } from '../common/constants/accountRoles'
import { GeneralValidations } from '../common/validations'

export const CategoriesRouter = new Router('/categories')

CategoriesRouter.get('/', CategoriesController.getCategories)

CategoriesRouter.get('/all', CategoriesController.getCategoriesAll).configure({
    authorized: true,
    allowedRole: AccountRoles.ADMIN,
})

CategoriesRouter.post('/', CategoriesController.postCategory).configure({
    authorized: true,
    allowedRole: AccountRoles.ADMIN,
}).validate({
    short_name: GeneralValidations.categoryShortName,
})

CategoriesRouter.put('/', CategoriesController.toggleCategory).configure({
    authorized: true,
    allowedRole: AccountRoles.ADMIN,
}).validate({
    short_name: GeneralValidations.categoryShortName,
})