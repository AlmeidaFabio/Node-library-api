import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async(): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            type:process.env.DB_TYPE,
            database:process.env.DB_NAME,
            host:process.env.DB_HOST,
            port:process.env.DB_PORT,
            username:process.env.DB_USER,
            password:process.env.DB_PASS
        })
    )
}