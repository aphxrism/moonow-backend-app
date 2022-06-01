namespace NodeJS {
    interface ProcessEnv {
        HOSTNAME: string
        PORT: string
        JWT_SECRET: string
        POSTGRES_USER: string
        POSTGRES_PASSWORD: string
        POSTGRES_DB: string
        POSTGRES_PORT: string
    }
}