import { DataTypes, Model, Sequelize } from 'sequelize'
import { DatabaseConfig } from '../database/config'

export class ArticlesModel extends Model {
    id!: number
    title!: string
    category_id!: number
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
        },
    }, {
        sequelize,
        tableName: DatabaseConfig.TABLE_NAMES.Articles,
        timestamps: true,
    })
}