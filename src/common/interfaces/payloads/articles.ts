import { IArticleContent } from '../articleContent'

export interface PostArticlePayload {
    title: string
    short_name: string
    content: IArticleContent
}

type TArticleId = { id: number }

export type PutArticlePayload = PostArticlePayload & TArticleId

export type DeleteArticlePayload = TArticleId