import { DataTypes, Model, Sequelize } from 'sequelize'
import { DatabaseConfig } from '../database/config'

export class AccessTokensModel extends Model {
    id!: number
    account_id!: number
    access_token!: string
}

export function initializeAccessTokensModel (sequelize: Sequelize): any {
    return AccessTokensModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        access_token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: DatabaseConfig.TABLE_NAMES.AccessTokens,
        timestamps: false,
    })
}