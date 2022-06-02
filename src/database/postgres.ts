import { Sequelize, Options } from 'sequelize'
import { initializeAccountsModel } from '../models/account'
import { AccountsModel } from '../models/account'

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

            console.log('Database models & relations initialized!')
        } catch (err) {
            console.log(err)
        }
    }

}