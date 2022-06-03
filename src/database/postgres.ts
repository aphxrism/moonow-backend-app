import { Sequelize, Options } from 'sequelize'
import { initializeAccessTokensModel } from '../models/accessToken'
import { initializeAccountsModel } from '../models/accounts'
import { initializeCategoriesModel } from '../models/category'

export class DatabaseInstance {

    private static connection: Sequelize
    
    static getConnection (): Sequelize {
        if (!this.connection) {
            const options: Options = {
                host: process.env.HOSTNAME,
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                port: parseInt(process.env.POSTGRES_PORT),
                dialect: 'postgres',
                logging: false,
            }
            this.connection = new Sequelize(options)
        }

        return this.connection
    }

    static async initializeModels (): Promise<void> {
        try {
            DatabaseInstance.getConnection()
            await this.connection.authenticate()

            initializeAccountsModel(this.connection)
            initializeCategoriesModel(this.connection)
            initializeAccessTokensModel(this.connection)

            const {
                AccountsModel,
                CategoriesModel,
                AccessTokensModel,
            } = this.connection.models

            AccountsModel.hasOne(AccessTokensModel, { foreignKey: { name: 'account_id' } })

            console.log('Database models & relations initialized!')
        } catch (err) {
            console.log(err)
        }
    }

}