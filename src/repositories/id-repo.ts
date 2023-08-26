import { Entity, IEntity } from "../entities/id-entity";
import mysql, { FieldPacket, RowDataPacket } from "mysql2/promise";

export interface IRepo<T extends IEntity>{
    getById(id: number) : Promise<T>;
    getMany(filter: Partial<T>) : Promise<Array<T>>;
    deleteById(id: number): Promise<T>;
    save(entity: T): Promise<T>;
}


export class Repo<T extends IEntity> implements IRepo<T>{
    private _entityFactory : new (...args: any[]) => T;
    private _pool : mysql.Pool;
    /**
     *
     */
    constructor(entityFactory : new (...args: any[]) => T, sqlPool: mysql.Pool) {
        this._entityFactory = entityFactory;
        this._pool = sqlPool;
    }

    private _buildWhereClause(filter: Record<string, any>) : {whereClause:string, values: any[]}{
        const entity = new this._entityFactory();
        const tableName = `\`${entity.getTableName()}\``;
        const whereClauseCriterias = Object.keys(filter)
            .map((key) => {
                const columnDesc = entity.getColumnDescForField('id');
                const columnName = `\`${columnDesc?.name}\``;
                return `${tableName}.${columnName} = ?`
            })
            .reduce((prev, cur)=>{
                if (prev !== '') prev+=',';
                return prev + cur;
            }, '');
        const whereClause = (whereClauseCriterias === '') ? '' : `WHERE ${whereClauseCriterias}`;
        return {
            whereClause: whereClause,
            values: Object.values(filter),
        }
    }

    private _isInstanceOfEntity(val : any): val is T{
        const entity = new this._entityFactory();
        for(let key of Object.keys(entity)){
            if(!(key in val)) return false;
        }
        return true;
    }

    async getById(id: number): Promise<T> {
        const entity = new this._entityFactory();
        const tableName = `\`${entity.getTableName()}\``;
        const {whereClause, values} = this._buildWhereClause({id: id});
        const [rows, fields] = await this._pool.query(
            `SELECT * FROM ${tableName} ${whereClause}`,
            values)
        let result;
        if (rows instanceof Array){
            result = rows.map((val)=>{
                if (!this._isInstanceOfEntity(val)) throw Error('query result is not an instace of entity')
                const newEntity = new this._entityFactory(val);
                return newEntity;
            })
        } else {
            throw Error('unexpected query result type');
        }
        result = result.at(0);
        if (!result) throw new Error(`item not found with id ${id}`);
        return result;
    }
    async getMany(filter: Partial<T>): Promise<T[]> {
        const entity = new this._entityFactory();
        const tableName = `\`${entity.getTableName()}\``;
        const {whereClause, values} = this._buildWhereClause(filter);
        const [rows, fields] = await this._pool.query(
            `SELECT * FROM ${tableName} ${whereClause}`,
            values);
        // console.log(rows);
        let result;
        if (rows instanceof Array){
            result = rows.map((val)=>{
                if (!this._isInstanceOfEntity(val)) throw Error('query result is not an instace of entity')
                const newEntity = new this._entityFactory(val);
                return newEntity;
            })
        } else {
            throw Error('unexpected query result type');
        }
        // console.log(values);
        return result;
    }
    deleteById(id: number): Promise<T> {
        throw new Error("Method not implemented.");
    }
    save(entity: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    
}