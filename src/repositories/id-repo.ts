import { Entity, IEntity } from "../entities/id-entity";
import mysql from "mysql2/promise";

export interface IRepo<T extends IEntity>{
    getById(id: number) : Promise<T>;
    getMany(filter: Partial<T>) : Promise<Array<T>>;
    deleteById(id: number): Promise<T>;
    save(entity: T): Promise<T>;
}


export class Repo<T extends IEntity> implements IRepo<T>{
    private _entityFactory : new (...args: any[]) => IEntity;
    private _pool : mysql.Pool;
    /**
     *
     */
    constructor(entityFactory : new (...args: any[]) => IEntity, sqlPool: mysql.Pool) {
        this._entityFactory = entityFactory;
        this._pool = sqlPool;
    }

    private _buildWhereClause(filter: Partial<T>) : {whereClause:string, values: any[]}{
        const entity = new this._entityFactory();
        const tableName = `\`${entity.getTableName()}\``;
        const whereClause = Object.keys(filter)
            .map((key) => {
                return `${tableName}.\`${entity.getColumnDescForField(key)}\` = ?`
            })
            .reduce((prev, cur)=>{
                if (prev !== '') prev+=',';
                return prev + cur;
            }, '');
        return {
            whereClause: whereClause,
            values: Object.values(filter),
        }
    }

    async getById(id: number): Promise<T> {
        const entity = new this._entityFactory();
        const tableName = `\`${entity.getTableName()}\``;
        const idColumnName = `\`${entity.getColumnDescForField('id')}\``;
        const [rows, fields] = await this._pool.query(
            `SELECT * FROM ${tableName} WHERE ${tableName}.${idColumnName} = ?`,
            [id])
        throw new Error("Method not implemented.");
    }
    async getMany(filter: Partial<T>): Promise<T[]> {
        const entity = new this._entityFactory();
        const tableName = `\`${entity.getTableName()}\``;
        const idColumnName = `\`${entity.getColumnDescForField('id')}\``;
        const {whereClause, values} = this._buildWhereClause(filter);
        const [rows, fields] = await this._pool.query(
            `SELECT * FROM ${tableName} WHERE ${whereClause}`,
            values);
        console.log(rows);
        console.log(values);
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<T> {
        throw new Error("Method not implemented.");
    }
    save(entity: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    
}