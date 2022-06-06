import validator from 'validator'
import { ArticleContentTypes, IArticleContent } from './interfaces/articleContent'
import { IValidator } from './interfaces/validator'

export const GeneralValidations: IValidator = {

    email: (value: string) => validator.isEmail(value),
    password: (value: string) => validator.isStrongPassword(value),
    isNotEmpty: (value: string) => value.length > 0,
    id: (value: number) => typeof value === 'number',
    categoryShortName: (value: string) => value.length === 3,

}

export const ArticlesValidation = {
    title: GeneralValidations.isNotEmpty,
    short_name: GeneralValidations.categoryShortName,
    content: (value: IArticleContent) => {
        if (value === null) return false

        for(const key in value) {
            if (value[key].content === undefined || value[key].type === undefined) return false

            if (!Object.keys(ArticleContentTypes).includes(value[key].type)) return false
        }
        return true
    },
}