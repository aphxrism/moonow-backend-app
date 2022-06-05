export enum ArticleContentTypes {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE',
    HEADER = 'HEADER',
}

interface IArticleContentItem {
    type: ArticleContentTypes,
    content: any
}

export type IArticleContent = IArticleContentItem[]