import { DataTypes, Model, Sequelize } from 'sequelize'
import { DatabaseConfig } from '../database/config'

export class CategoriesModel extends Model {
    id!: number
    short_name!: string
}

export function initializeCategoriesModel (sequelize: Sequelize): any {
    return CategoriesModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        short_name: {
            type: DataTypes.STRING(3),
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: DatabaseConfig.TABLE_NAMES.Categories,
        timestamps: false,
    })
}