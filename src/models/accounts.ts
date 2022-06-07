import { DataTypes, Model, Sequelize } from 'sequelize'
import { AccountRoles } from '../common/constants/accountRoles'
import { DatabaseConfig } from '../database/config'

export class AccountsModel extends Model {
    id!: string
    email!: string
    hash!: string
    role!: AccountRoles
}

export function initializeAccountsModel (sequelize: Sequelize): any {
    return AccountsModel.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM(...Object.values(AccountRoles)),
            defaultValue: AccountRoles.READER,
            allowNull: false,
        },
        user_name: {
            type: DataTypes.STRING(48),
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: DatabaseConfig.TABLE_NAMES.Accounts,
        timestamps: true,
    })
}