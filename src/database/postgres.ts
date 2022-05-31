import { Sequelize } from 'sequelize'
import { ErrorCodes } from '../common/constants/errorCodes'
import { initializeAccountsModel } from '../models/account'
import { DatabaseConfig } from './config'

export class DatabaseInstance {

    private static connection: Sequelize
    
    static getConnection (): Sequelize {
        if (!this.connection) {
            this.connection = new Sequelize({
                ...DatabaseConfig.CREDENTIALS,
                dialect: 'postgres',
                logging: false,
            })
        }

        return this.connection
    }

    static async initializeModels (): Promise<void> {
        try {
            DatabaseInstance.getConnection();

            initializeAccountsModel(this.connection)

        } catch (err) {
            console.log(err)
        }
    }

}