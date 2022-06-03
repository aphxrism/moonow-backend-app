import { OperationResult } from '../common/interfaces/operationResult'
import { CategoriesModel } from '../models/category'

export namespace CategoriesService {

    export async function getCategories (): Promise<OperationResult> {
        const categories = await CategoriesModel.findAll({
            raw: true
        })

        return {
            success: true,
            data: {
                list: categories,
            },
        }
    }

}