import { OperationResult } from "../common/interfaces/operationResult";
import { AccountsModel } from "../models/accounts";

export namespace CategoriesService {

    export async function getCategories (payload: any, account: AccountsModel): Promise<OperationResult> {
        
        return {
            success: true,
            data: {
                id: account.id,
            },
        }
    }

}