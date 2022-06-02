import { DataTypes } from 'sequelize'
import { DatabaseConfig } from '../../database/config'
import { DatabaseInstance } from '../../database/postgres'

const AccountsModel = DatabaseInstance.getConnection().define(DatabaseConfig.TABLE_NAMES.Accounts, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, {
    timestamps: false,
})

export { AccountsModel }

// export function initializeAccountsModel (sequelize: Sequelize): void {
// initializeAccountsModel(this.connection)
// AccountsModel.init({
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
// }, {
//     sequelize: this.connection,
//     tableName: DatabaseConfig.TABLE_NAMES.Accounts,
//     timestamps: false,
// })
// }