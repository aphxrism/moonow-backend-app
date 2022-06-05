import { DataTypes, Model, Sequelize } from 'sequelize'
import { IArticleContent } from '../common/interfaces/articleContent'
import { DatabaseConfig } from '../database/config'

export class ArticlesModel extends Model {
    id!: number
    title!: string
    account_id!: number
    category_id!: number
    content!: IArticleContent
}

export function initializeArticlesModel (sequelize: Sequelize): any {
    return ArticlesModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: DatabaseConfig.TABLE_NAMES.Articles,
        timestamps: true,
    })
}