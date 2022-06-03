import { OperationResult } from "../../common/interfaces/operationResult";

export namespace CategoriesService {

    export async function getCategories (): Promise<OperationResult> {
        
        return {
            success: true,
        }
    }

}