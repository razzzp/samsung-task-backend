
import { IEntity, Ref } from "../entities/entity";
import { IKabupaten } from "../entities/kabupaten";
import { IProvince, Province } from "../entities/province-entity";

export interface IDataValidator<T extends IEntity>{
    validatePostData(data: any) : T;
    validatePutData(data: any) : T;
}

export class DataValidationError extends Error{

}

export class ProvinceDataValidator implements IDataValidator<IProvince>{
    private _validateInvalidKeys(data: any){
        const entityKeys = Object.keys(new Province());
        Object.keys(data).forEach((key)=>{
            if(!entityKeys.includes(key)) throw new DataValidationError(`'${key}' field is not supported`);
        });
    }

    validatePostData(data: any): IProvince {
        data = validateObject(data);
        validateIdUndefined(data['id']);
        data['name'] = validateName(data['name']);
        this._validateInvalidKeys(data)
        return data;
    }

    validatePutData(data: any) : IProvince{
        data = validateObject(data);
        validateId(data['id']);
        data['name'] = validateName(data['name']);
        this._validateInvalidKeys(data)
        return data;
    }
}

export class KabupatenDataValidator implements IDataValidator<IKabupaten>{
    private _validateInvalidKeys(data: any){
        const entityKeys = Object.keys(new Province());
        Object.keys(data).forEach((key)=>{
            if(!entityKeys.includes(key)) throw new DataValidationError(`'${key}' field is not supported`);
        });
    }

    validatePostData(data: any): IKabupaten {
        data = validateObject(data);
        validateIdUndefined(data['id']);
        data['name'] = validateName(data['name']);
        data['province'] = validateRefId<IProvince>(data);
        this._validateInvalidKeys(data);
        return data;
    }

    validatePutData(data: any) : IKabupaten{
        data = validateObject(data);
        validateId(data['id']);
        data['name'] = validateName(data['name']);
        data['province'] = validateRefId<IProvince>(data);
        this._validateInvalidKeys(data)
        return data;
    }
}

function validateObject(data : any) : Object {
    if (!(data instanceof Object)){
        throw new DataValidationError('data should be an object');
    }
    return data;
}

function validateIdUndefined(data : any) : data is undefined {
    if (data){
        throw new DataValidationError(`'id' field should not be present`);
    }
    return true;
}

function validateId(data : any) : number {
    if (typeof data === 'number') return data;
    if (typeof data === 'string'){
       const id =  Number.parseInt(data);
       return id;
    }
    throw new DataValidationError(`'id' field should be a number`);
}

function validateRefId<T extends IEntity>(data : any) : Ref<T> {
    if (typeof data === 'number') return data;
    if (typeof data === 'object' && typeof data.id ==='number'){
       return data;
    }
    throw new DataValidationError(`'id' field should be a number`);
}

function validateName(name : any) : string {
    if (typeof name !== 'string') throw new DataValidationError(`'name' field should be a string`);
    const re = /^[a-zA-Z\s]+$/;
    name = name.trim();
    if (re.test(name)){
        return name;
    } else {
        throw new DataValidationError(`'name' field should contain only letters`);
    }
}