import { configDotenv } from "dotenv";

import mysql2 from "mysql2/promise"
import { Association, BelongsToGetAssociationMixin, CreationOptional, DataTypes, Model, NonAttribute, Sequelize } from "sequelize";
import { RepoObjectNotFoundError } from "./repositories/repo";
import { Id } from "./entities/entity";
export interface IDataSource {

}

export function createSQLPool() : mysql2.Pool {
    const connectionLimit = process.env.MYSQL_CONNECT_LIMIT ? Number.parseInt(process.env.MYSQL_CONNECT_LIMIT) : 10;
    const config = {
        connectionLimit: connectionLimit,
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    };
    const mySQLPool = mysql2.createPool(config);
    return mySQLPool;
}

const host = process.env.MYSQL_HOST;
const dbName = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
if (!dbName || !username || ! password || !host) throw new RepoObjectNotFoundError('cannot find repo params');

export const sequelize =  new Sequelize(dbName, username, password, {
    host: host,
    dialect: 'mysql'
});

class ProvinceModel extends Model {
    declare id: Id;
    declare name: string;
}
ProvinceModel.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
    }
}, {sequelize, modelName: 'ProvinceModel',tableName: 'province'});


class KabupatenModel extends Model {
    declare id: Id;
    declare name: string;
    declare getProvince: BelongsToGetAssociationMixin<ProvinceModel>;
    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    declare province: NonAttribute<ProvinceModel>; // Note this is optional since it's only populated when explicitly requested in code
    declare static associations: {
        projects: Association<KabupatenModel, ProvinceModel>;
    };
}
KabupatenModel.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
    },
}, {sequelize, modelName: 'KabupatenModel',tableName: 'kabupaten'});
ProvinceModel.hasMany(KabupatenModel, {
    foreignKey: 'provinceId',
    as: 'province'})
KabupatenModel.belongsTo(ProvinceModel, {
    foreignKey: 'provinceId',
    as: 'province'
})

export {ProvinceModel, KabupatenModel};





