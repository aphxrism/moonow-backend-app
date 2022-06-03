import { OperationResult } from "../common/interfaces/operationResult";
import { CategoriesService } from "../services/categories";

export namespace CategoriesController {

    export async function getCategories (): Promise<OperationResult> {
        return await CategoriesService.getCategories()
    }

}