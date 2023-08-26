import { RowDataPacket } from "mysql2";
import { Option } from "../utils";


export interface ColumnDesc {
    name: string;
    type: string;
    modifiers: Option<[string]>;
}

export interface IEntity{
    id: Id;
    getTableName() : string;
    getColumnDescForField(fieldName: string): Option<ColumnDesc>;
}

export type Id = number | undefined;

export class Entity{
    id: Id;
    public static getTableName() : string{
        return ""
    }
    public static getColumnNameForField(fieldName: string): Option<string>{
        return undefined;
    }
}
