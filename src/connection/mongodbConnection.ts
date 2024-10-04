import {MongoClient, Db} from 'mongodb'
import log from '../log/logger'
import 'colors'

let db: Db | null;
let client: MongoClient | null;

async function initialize() {
    await connect();
}

async function connect() {

    if (db) {
        return db;
    }
    
    if (!process.env.MONGO_URI) {
        let msg = "Configuration Error: 'mongoDB.url' not found on config.";
        log.error(msg.red)
        throw Error(msg);
    }

    if (!process.env.MONGO_DB_NAME) {
        let msg = "Configuration Error: 'mongoDB.MONGO_DB_NAME' not found on config.";
        log.error(msg.red)
        throw Error(msg);
    }

    const uri: string = process.env.MONGO_URI;
    const dbName: string = process.env.MONGO_DB_NAME;

    client = new MongoClient(uri);

    await client.connect();
    log.info("[*] MongoDB connected successfully.".blue);

    db = client.db(dbName);
    return db;
}

async function disconnect() {
    if (!client)
        return;

    await client.close();
    db = null;

    log.info("[*] MongoDB connection closed.".blue);
}

async function getDb(): Promise<Db> {
    if (!db)
        return connect();
    else
        return db;
}

async function getClient() {

    if (!client)
        throw new Error("MongoDB connection not initialized");

    return client;
}

export default {
    initialize,
    getDb,
    getClient,
    connect,
    disconnect,
};