import { configDotenv } from "dotenv";

import mysql2 from "mysql2/promise"
export interface IDataSource {

}

export function createSQLPool() : mysql2.Pool {
    const connectionLimit = process.env.MYSQL_CONNECT_LIMIT ? Number.parseInt(process.env.MYSQL_CONNECT_LIMIT) : 10;
    const mySQLPool = mysql2.createPool({
        connectionLimit: connectionLimit,
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    })

    return mySQLPool;
}