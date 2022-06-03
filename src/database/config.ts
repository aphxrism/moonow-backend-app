export const DatabaseConfig = {
    CREDENTIALS: {
        host: process.env.HOSTNAME,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: process.env.POSTGRES_PORT,
    },
    TABLE_NAMES: {
        Accounts: 'accounts',
        AccessTokens: 'access_tokens',
    },
}