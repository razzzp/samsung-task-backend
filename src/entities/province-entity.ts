import { Option } from "../utils";
import { ColumnDesc, Entity, IEntity, Id } from "./id-entity";



export interface IProvince extends IEntity{
    name: string;
}

export class Province extends Entity implements IProvince{
    public name: string;
    private static _fieldMappings: Record<string, ColumnDesc>={
        'id': {
            name:'id',
            type: 'BIGINT UNSIGNED',
            modifiers: [
                'PRIMARY KEY',
            ]
        },
        'name': {
            name: 'name',
            type: 'VARCHAR(64)',
            modifiers: undefined,
        }
    };
    /**
     *
     */
    constructor(val: {id :Id,  name: string} = {id:0, name:''}) {
        super();
        this.id = val.id;
        this.name = val.name;
    }
    public getTableName(): string {
        return 'province'
    }
    public getColumnDescForField(fieldName: string): Option<ColumnDesc>{
        return Province._fieldMappings[fieldName];
    }
}