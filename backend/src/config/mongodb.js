import { MongoClient, ServerApiVersion } from 'mongodb';
import { env } from './environment';



let DATABASE = null

const mongoClient = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})


export const CONNECT_DB = async () => {
    await mongoClient.connect();

    DATABASE = mongoClient.db(env.DATABASE_NAME)

}

export const GET_DB = () => {
    if(!DATABASE) throw new Error('Must connect to DATABASE first!')
    return DATABASE;
}
export const CLOSE_DB = async () => {
    await mongoClient.close();
}