import { OperationResult } from '../common/interfaces/operationResult'
import { CategoryPayload } from '../common/interfaces/payloads/categories'
import { CategoriesService } from '../services/categories'

export namespace CategoriesController {

    export async function getCategories (): Promise<OperationResult> {
        return await CategoriesService.getCategories()
    }

    export async function getCategoriesAll (): Promise<OperationResult> {
        return await CategoriesService.getCategoriesAll()
    }

    export async function postCategory (payload: CategoryPayload): Promise<OperationResult> {
        return await CategoriesService.postCategory(payload)
    }

    export async function toggleCategory (payload: CategoryPayload): Promise<OperationResult> {
        return await CategoriesService.toggleCategory(payload)
    }

}
