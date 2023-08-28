import { RowDataPacket } from "mysql2";
import { Option } from "../utils";


export interface ColumnDesc {
    name: string;
    type: string;
    modifiers: Option<string[]>;
}
export type Id = Option<number>;
export type Ref<T extends IEntity> = number | T | undefined | {id: Id};

export interface IEntity{
    id: Id,
    name: string;
    [key : string] : any;
    get(key: string) : any;
    set(key: string, val: any): IEntity;
}
export class Entity implements IEntity{
    [key: string]: any;
    get(key: string) {
        return this[key];
    }
    set(key: string, val: any): IEntity {
        this[key] = val;
        return this;
    }
    id: Id;
    name: string = '';
    // public static getTableName() : string{
    //     return ""
    // }
    // public static getColumnNameForField(fieldName: string): Option<string>{
    //     return undefined;
    // }
}
