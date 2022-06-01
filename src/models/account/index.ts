import { DataTypes, Model, Sequelize } from 'sequelize'
import { DatabaseConfig } from '../../database/config'

export class AccountsModel extends Model {
    declare id: number
}

// export function initializeAccountsModel (sequelize: Sequelize): void {
    
// }