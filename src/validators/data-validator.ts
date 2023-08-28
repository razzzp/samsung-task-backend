
import { IEntity, Id, Ref } from "../entities/entity";
import { IKabupaten } from "../entities/kabupaten";
import { IProvince, Province } from "../entities/province";

export interface IDataValidator<T extends IEntity>{
    // generic data validator, checks types only
    validateData(data: any) : T;

    // for request data
    validatePostData(data: any) : T;
    validatePutData(data: any) : T;
}

export class DataValidationError extends Error{

}

export abstract class EntityValidator implements IDataValidator<IEntity>{
    protected _getKeys(): string[]{
        return ['id', 'name'];
    }
    protected _checkInvalidKeys(data: any){
        const entityKeys = this._getKeys();
        Object.keys(data).forEach((key)=>{
            if(!entityKeys.includes(key)) throw new DataValidationError(`'${key}' field is not supported`);
        });
    }
    validateData(data: any): IEntity {
        isObject(data);
        isId(data, 'id');
        isString(data, 'name');
        this._checkInvalidKeys(data);
        return data;
    }
    validatePostData(data: any): IEntity {
        isObject(data);
        isUndefined(data, 'id');
        data['name'] = checkNameAlphaOnly(data, 'name');
        this._checkInvalidKeys(data)
        return data;
    }
    validatePutData(data: any): IEntity {
        isObject(data);
        isId(data, 'id');
        data['name'] = checkNameAlphaOnly(data, 'name');
        this._checkInvalidKeys(data)
        return data;
    }
    
}


export class ProvinceDataValidator extends EntityValidator implements IDataValidator<IProvince>{
    // same as EntityValidator
}

export class KabupatenDataValidator  extends EntityValidator implements IDataValidator<IKabupaten>{
    protected _getKeys() : string[] {
        return super._getKeys().concat(['provinceId']);
    }

    validateData(data: any): IKabupaten {
        let entity = super.validateData(data);
        isId(data,'provinceId');
        return data;
    }

    validatePostData(data: any): IKabupaten {
        let entity = super.validatePostData(data);
        isIdPresent(data,'provinceId');
        return data;
    }

    validatePutData(data: any) : IKabupaten{
        let entity = super.validatePutData(data);
        isIdPresent(data,'provinceId');
        return data;
    }
}

function isObject(data : any, field?: string) : data is Object {
    if(field) data = data[field];
    if (!(data instanceof Object)){
        throw new DataValidationError(`${field?`'${field}'`:'data'} should be an object`);
    }
    return data;
}


function isUndefined(data : any, field?: string) : data is undefined {
    if(field) data = data[field];
    if (data){
        throw new DataValidationError(`${field?`'${field}'`:'data'} should not be present`);
    }
    return true;
}

function isId(data : any, field?: string) : data is Id {
    if(field) data = data[field];
    if (!data) return true;
    if (typeof data === 'number') return true;
    throw new DataValidationError(`${field?`'${field}'`:'data'} should be an Id`);
}

function isIdPresent(data : any, field?: string) : data is number {
    if(field) data = data[field];
    if (typeof data === 'number') return true;
    throw new DataValidationError(`${field?`'${field}'`:'data'} should be a number`);
}

function checkRefId<T extends IEntity>(data : any, field?: string) : Ref<T> {
    if(field) data = data[field];
    if (typeof data === 'number') return data;
    if (typeof data === 'object' && typeof data.id ==='number'){
       return data;
    }
    throw new DataValidationError(`${field?`'${field}'`:'data'} should be a Reference`);
}

function isString(data: any, field?: string) : data is string {
    if(field) data = data[field];
    if(typeof data !== 'string') throw new DataValidationError(`${field?`'${field}'`:'data'} field should be a string`);
    return true;
}

function checkNameAlphaOnly(data : any, field?: string) : string {
    if(field) data = data[field];
    if (typeof data !== 'string') throw new DataValidationError(`${field?`'${field}'`:'data'} field should be a string`);
    const re = /^[a-zA-Z\s]+$/;
    data = data.trim();
    if (re.test(data)){
        return data;
    } else {
        throw new DataValidationError(`'name' field should contain only letters`);
    }
}