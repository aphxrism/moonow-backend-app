import { ErrorCodes } from '../common/constants/errorCodes'
import { HttpStatusCodes } from '../common/constants/httpStatusCodes'
import { OperationResult } from '../common/interfaces/operationResult'
import { CategoryPayload } from '../common/interfaces/payloads/categories'
import { PortalError } from '../common/utilities/error'
import { CategoriesModel } from '../models/category'

export namespace CategoriesService {

    export async function getCategories (): Promise<OperationResult> {
        const categories = await CategoriesModel.findAll({
            where: { disabled: false },
            raw: true
        })

        return {
            success: true,
            data: {
                list: categories,
            },
        }
    }

    export async function postCategory (payload: CategoryPayload): Promise<OperationResult> {
        const foundCategory = await CategoriesModel.findOne({
            where: { short_name: payload.short_name },
        })

        if (foundCategory) {
            throw PortalError({
                code: ErrorCodes.api.categoryExists,
                status: HttpStatusCodes.BAD_REQUEST,
                message: `Category [${payload.short_name}] already exists`,
                source: 'CategoriesService.postCategory()',
            })
        }

        const createdCategory = await CategoriesModel.create({
            short_name: payload.short_name,
        })

        return {
            success: true,
            data: {
                id: createdCategory.id,
            },
        }
    }

    export async function getCategoriesAll (): Promise<OperationResult> {
        const categories = await CategoriesModel.findAll({ raw: true })

        return {
            success: true,
            data: {
                list: categories,
            },
        }
    }

    export async function toggleCategory (payload: CategoryPayload): Promise<OperationResult> {
        const foundCategory = await CategoriesModel.findOne({
            where: { short_name: payload.short_name },
        })

        if (!foundCategory) {
            throw PortalError({
                code: ErrorCodes.api.categoryNotFound,
                status: HttpStatusCodes.BAD_REQUEST,
                message: `Category [${payload.short_name}] not found`,
                source: 'CategoriesService.toggleCategory()',
            })
        }

        const newDisabledValue = !foundCategory.disabled

        await foundCategory.update({
            disable: newDisabledValue
        })
        
        return {
            success: true,
            data: {
                disabled: newDisabledValue,
            },
        }
    }

}