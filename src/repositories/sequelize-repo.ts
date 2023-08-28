import { Model, ModelStatic, where } from "sequelize";
import { Entity, IEntity, Id } from "../entities/entity";
import { IRepo, Repo, RepoObjectNotFoundError, RepoParamError } from "./repo";
import { IProvince, Province } from "../entities/province";
import { KabupatenModel, ProvinceModel } from "./data-source";
import { IKabupaten, Kabupaten } from "../entities/kabupaten";
import { resourceUsage } from "process";
import { Option } from "../utils";

function convertToEntity<T extends IEntity>(model : Model, entityCtor:  new(...args: any[]) => T) : T {
    let result = new entityCtor();
    for(let key of Object.keys(result)){
        result.set(key, model.getDataValue(key));   
    }
    return result;
}


// so far can't get it to work with generics...
// export class SequelizeRepo<T extends IEntity, M extends Model & keyof T > implements IRepo<T>{

//     private _model : ModelStatic<M>;
//     private _entityCtor : new(...args: any[]) => T;
//     /**
//      *
//      */
//     constructor(model: ModelStatic<M>, entityCtor: new(...args: any[]) => T) {
//         this._model = model;      
//         this._entityCtor = entityCtor;  
//     }
//     async getById(id: number): Promise<T>{
//         const model =  await this._model.findByPk(id);
//         if (!model) throw new RepoObjectNotFoundError(`unable to find province with Id ${id}`);
//         return convertToEntity(model, this._entityCtor);
//     }
//     async getMany(filter: Partial<IProvince>): Promise<T[]> {
//         const models =  await this._model.findAll({
//             where: filter
//         });
//         return models.map((model)=>{
//             return convertToEntity(model, this._entityCtor);
//         })
//     }
//     async deleteById(id: number): Promise<void> {
//         const result = await this._model.destroy({
//             where:{
//                 id: id
//             }
//         })
//         return;
//     }

//     async create(entity: IProvince): Promise<T> {
//         const createdModel = await this._model.create(entity as Partial<T>);
//         return convertToEntity(createdModel, this._entityCtor);
//     }
//     async update(entity: IProvince): Promise<[number]> {
//         if (!entity.id) throw new RepoParamError(`'id' field should be defined for an update`)
//         const result = this._model.update(entity, {
//             where:{
//                 id : entity.id
//             }
//         });
//         return result;
//     }

//     async save(entity: Partial<IProvince>): Promise<T> {
//         const model = this._model.build(entity);
//         const savedModel = await model.save();
//         return convertToEntity(savedModel, this._entityCtor);
//     }
    
// }

export class ProvinceSequelizeRepo implements IRepo<IProvince>{

    private _model : ModelStatic<ProvinceModel>;
    private _entityCtor : new(...args: any[]) => IProvince;
    /**
     *
     */
    constructor() {
        this._model = ProvinceModel;      
        this._entityCtor = Province;  
    }
    async getById(id: number): Promise<Option<IProvince>>{
        const model =  await this._model.findByPk(id);
        if (!model) return undefined;
        return convertToEntity(model, this._entityCtor);
    }
    async getMany(filter: Partial<IProvince>): Promise<IProvince[]> {
        const models =  await this._model.findAll({
            where: filter
        });
        return models.map((model)=>{
            return convertToEntity(model, this._entityCtor);
        })
    }
    async deleteById(id: number): Promise<number> {
        const result = await this._model.destroy({
            where:{
                id: id
            }
        })
        return result;
    }

    async create(entity: IProvince): Promise<IProvince> {
        const createdModel = await this._model.create(entity as Partial<IProvince>);
        return convertToEntity(createdModel, this._entityCtor);
    }
    async update(entity: IProvince): Promise<[number]> {
        if (!entity.id) throw new RepoParamError(`'id' field should be defined for an update`)
        const result = this._model.update(entity, {
            where:{
                id : entity.id
            }
        });
        return result;
    }

    async save(entity: Partial<IProvince>): Promise<IProvince> {
        const model = this._model.build(entity);
        const savedModel = await model.save();
        return convertToEntity(savedModel, this._entityCtor);
    }
    
}

function convertToKabupaten(
    model: KabupatenModel, 
    entityCtor:  new(...args: any[]) => IKabupaten) : IKabupaten {
    let result = convertToEntity(model, entityCtor);
    result.provinceId = model.provinceId;
    if (model.province) result.province = convertToEntity(model.province, Province)
    return result;
}

export class KabupatenSequelizeRepo implements IRepo<IKabupaten>{

    private _model : ModelStatic<KabupatenModel>;
    private _entityCtor : new(...args: any[]) => IKabupaten;
    private _convertToEntity : 
    (model: KabupatenModel, entityCtor:  new(...args: any[]) => IKabupaten) =>  IKabupaten;
    /**
     *
     */
    constructor() {
        this._model = KabupatenModel;      
        this._entityCtor = Kabupaten;  
        this._convertToEntity = convertToKabupaten;
    }
    async getById(id: number): Promise<Option<IKabupaten>>{
        const model =  await this._model.findByPk(id, {include: 'province'});
        if (!model) return undefined;
        return this._convertToEntity(model, this._entityCtor);
    }
    async getMany(filter: Partial<IKabupaten>): Promise<IKabupaten[]> {
        const models =  await this._model.findAll({
            where: filter,
            include: 'province',
        });
        return models.map((model)=>{
            return this._convertToEntity(model, this._entityCtor);
        })
    }
    async deleteById(id: number): Promise<number> {
        const result = await this._model.destroy({
            where:{
                id: id
            }
        })
        return result;
    }

    async create(entity: IKabupaten): Promise<IKabupaten> {
        const createdModel = await this._model.create(entity as Partial<IKabupaten>, {
            include: ProvinceModel
        });
        return this._convertToEntity(createdModel, this._entityCtor);
    }
    async update(entity: IKabupaten): Promise<[number]> {
        if (!entity.id) throw new RepoParamError(`'id' field should be defined for an update`)
        const result = this._model.update(entity, {
            where:{
                id : entity.id
            }
        });
        return result;
    }

    async save(entity: Partial<IKabupaten>): Promise<IKabupaten> {
        const model = this._model.build(entity);
        const savedModel = await model.save();
        return this._convertToEntity(savedModel, this._entityCtor);
    }
    
}

