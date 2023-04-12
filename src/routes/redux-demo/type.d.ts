export interface IArticle {
    id: number
    title: string
}

export type ArticleState = {
    articles: IArticle[]
}

export type ArticleAction = {
    type: string
    article: IArticle
}

export type DispatchType = (args: ArticleAction) => ArticleAction
