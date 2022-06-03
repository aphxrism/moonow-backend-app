import { Sequelize, Options } from 'sequelize'
import { initializeAccessTokensModel } from '../models/accessToken'
import { initializeAccountsModel } from '../models/accounts'
import { initializeArticlesModel } from '../models/article'
import { initializeCategoriesModel } from '../models/category'
import { DatabaseConfig } from './config'

export class DatabaseInstance {

    private static connection: Sequelize
    
    static getConnection (): Sequelize {
        if (!this.connection) {
            const options: Options = {
                ...DatabaseConfig.CREDENTIALS,
                port: parseInt(DatabaseConfig.CREDENTIALS.port),
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
            initializeArticlesModel(this.connection)
            initializeCategoriesModel(this.connection)
            initializeAccessTokensModel(this.connection)

            const {
                AccountsModel,
                ArticlesModel,
                CategoriesModel,
                AccessTokensModel,
            } = this.connection.models

            AccountsModel.hasOne(AccessTokensModel, { foreignKey: { name: 'account_id' } })
            CategoriesModel.hasOne(ArticlesModel, { foreignKey: { name: 'category_id' } })

            console.log('Database models & relations initialized!')
        } catch (err) {
            console.log(err)
        }
    }

}