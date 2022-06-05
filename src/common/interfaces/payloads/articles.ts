import { IArticleContent } from '../articleContent'

export interface PostArticlePayload {
    title: string
    short_name: string
    content: IArticleContent
}