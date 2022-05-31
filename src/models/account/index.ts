import { DataTypes, Model, Sequelize } from 'sequelize'
import { DatabaseConfig } from '../../database/config'

export class AccountsModel extends Model {
    id!: number
}

export function initializeAccountsModel (sequelize: Sequelize): void {
    AccountsModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    }, {
        sequelize,
        tableName: DatabaseConfig.TABLE_NAMES.Accounts,
        timestamps: false,
    })
}