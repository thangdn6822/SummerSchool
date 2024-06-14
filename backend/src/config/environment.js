import 'dotenv/config'

export const env = {
    MONGODB_URI: process.env.MONGODB_URI,
    DATABASE_NAME: process.env.DATABASE_NAME,
    APP_PORT: process.env.APP_PORT,
    APP_HOST: process.env.APP_HOST,

    BUILD_MODE: process.env.BUILD_MODE,

    AUTHOR: process.env.AUTHOR,

    JWT_SECRET: process.env.JWT_SECRET

}