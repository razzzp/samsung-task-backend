import { Option } from "../utils";
import { ColumnDesc, Entity, IEntity, Id } from "./id-entity";



export interface IProvince extends IEntity{
    name: string;
}

export class Province extends Entity implements IProvince{
    public name: string;
    private _fieldMappings: Record<string, ColumnDesc>;
    /**
     *
     */
    constructor(id :Id,  name: string) {
        super();
        this.id = id;
        this.name = name;
        this._fieldMappings ={
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
        }
    }
    public getTableName(): string {
        return 'province'
    }
    public getColumnDescForField(fieldName: string): Option<ColumnDesc>{
        return this._fieldMappings[fieldName];
    }
}