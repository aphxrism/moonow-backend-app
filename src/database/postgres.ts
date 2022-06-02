import { Sequelize, Options, Model, DataTypes } from 'sequelize'
import { AccountsModel } from '../models/account'
import { DatabaseConfig } from './config'
// import { initializeAccountsModel } from '../models/account'

export class DatabaseInstance {

    private static connection: Sequelize
    
    static getConnection (): Sequelize {
        if (!this.connection) {
            console.log(process.env.HOSTNAME)
            const options: Options = {
                host: process.env.HOSTNAME,
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                port: parseInt(process.env.POSTGRES_PORT),
                dialect: 'postgres',
                logging: false,
            }
            console.log(options)
            this.connection = new Sequelize(options)
        }

        return this.connection
    }

    static async initializeModels (): Promise<void> {
        try {
            DatabaseInstance.getConnection()
            // await this.connection.authenticate()

            const models = [
                AccountsModel,
            ];

            for(const key in models) {
                models[key].sync({ alter: true })
            }

            console.log('Database models & relations initialized!')
        } catch (err) {
            console.log(err)
        }
    }

}