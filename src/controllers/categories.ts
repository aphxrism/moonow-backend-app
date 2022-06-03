import { OperationResult } from "../common/interfaces/operationResult";
import { AccountsModel } from "../models/accounts";
import { CategoriesService } from "../services/categories";

export namespace CategoriesController {

    export async function getCategories (payload: any, account: AccountsModel): Promise<OperationResult> {
        return await CategoriesService.getCategories(payload, account)
    }

}