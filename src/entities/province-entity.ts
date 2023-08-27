import { Option } from "../utils";
import { ColumnDesc, Entity, IEntity, Id } from "./entity";



export interface IProvince extends IEntity{
}

export class Province extends Entity implements IProvince{
    // private static _fieldMappings: Record<string, ColumnDesc>={
    //     'id': {
    //         name:'id',
    //         type: 'BIGINT UNSIGNED',
    //         modifiers: [
    //             'PRIMARY KEY',
    //             'AUTO_INCREMENT'
    //         ]
    //     },
    //     'name': {
    //         name: 'name',
    //         type: 'VARCHAR(64)',
    //         modifiers: undefined,
    //     }
    // };
    /**
     *
     */

    // public getTableName(): string {
    //     return 'province'
    // }
    // public getColumnDescForField(fieldName: string): Option<ColumnDesc>{
    //     return Province._fieldMappings[fieldName];
    // }
}