import { Entity, IEntity } from "../entities/entity";
import { IRepo } from "../repositories/repo";
import { Request, Response } from "express";
import { IDataValidator } from "../validators/data-validator";
import { IViewBuilder } from "../view-builders/view-builder";
import { IKabupaten } from "../entities/kabupaten";
import { IProvince } from "../entities/province";

export interface IController<T extends IEntity, U>{
    getAllEntities() :  Promise<U[]>;
    getEntityById(id :string) :  Promise<U>;
    createEntity(data : any) : Promise<U>;
    updateOrCreateEntityById(id: string, data : any) : Promise<U>;
    deleteById(id: string) : Promise<void>;
}

export class ControllerError extends Error{

}

export class Controller<T extends IEntity, U> implements IController<T, U>{


    private _repo: IRepo<T>;
    private _dataValidator : IDataValidator<T>;
    private _viewBuilder: IViewBuilder<T, U>;
    protected async _beforeSave(validatedEntity: T){
        // top be overriden
    }
    protected async _beforeDelete(id: number){
        // top be overriden
    }

    /**
     *
     */
    constructor(
        repo: IRepo<T>, 
        dataValidator: IDataValidator<T>,
        viewBuilder: IViewBuilder<T, U>,
        ) {
        this._repo = repo;
        this._dataValidator = dataValidator;
        this._viewBuilder= viewBuilder;
    }
    public async getAllEntities() :  Promise<U[]> {
        const entities = await this._repo.getMany({});
        const result = entities.map((entity)=>{
            return this._viewBuilder.buildView(entity);
        })
        return (result);
    }

    public async getEntityById(id :string) :  Promise<U> {
        const idNumber = Number.parseInt(id);
        const entity = await this._repo.getById(idNumber);
        if(!entity) throw new ControllerError(`entity with id: ${idNumber} not found`)
        const result = this._viewBuilder.buildView(entity);
        return result;
    }

    public async createEntity(data : any) : Promise<U>{
        const validatedEntity = this._dataValidator.validatePostData(data);
        await this._beforeSave(validatedEntity);
        const savedEntity = await this._repo.save(validatedEntity);
        const result = this._viewBuilder.buildView(savedEntity);
        return result;
    }

    public async updateOrCreateEntityById(id: string, data : any) : Promise<U>{
        const idNumber = Number.parseInt(id);
        // merge id into object
        data.id = idNumber;

        const validatedEntity = this._dataValidator.validatePutData(data);
        await this._beforeSave(validatedEntity);
        const updateCount = await this._repo.update(validatedEntity);
        if(updateCount[0] === 0) throw new ControllerError(`entity with id: ${idNumber} not found`)

        const updatedEntity = await this._repo.getById(idNumber);

        if(!updatedEntity) throw new ControllerError(`entity with id: ${idNumber} not found`)
        const result = this._viewBuilder.buildView(updatedEntity);
        return result;
    }

    async deleteById(id: string): Promise<void> {
        const idNumber = Number.parseInt(id);
        await this._beforeDelete(idNumber);
        const deleteCount = await this._repo.deleteById(idNumber);
        if(deleteCount === 0) throw new ControllerError(`entity with id: ${idNumber} does not exist`)
        return;
    }
}

export class KabupatenController extends Controller<IKabupaten, any> implements IController<IKabupaten, any>{
    private _provinceRepo: IRepo<IProvince>;

    /**
     *
     */
    constructor(
        repo: IRepo<IKabupaten>, 
        dataValidator: IDataValidator<IKabupaten>,
        viewBuilder: IViewBuilder<IKabupaten, any>,
        provinceRepo: IRepo<IProvince>
        ) {
        super(repo, dataValidator, viewBuilder);
        this._provinceRepo = provinceRepo;
    }

    protected async _beforeSave(validatedEntity: IKabupaten) {
        // checks province exist before saving
        if (!validatedEntity.provinceId) throw new ControllerError(`'provinceId' field is undefined`);
        const prov = await this._provinceRepo.getById(validatedEntity.provinceId);
        if (!prov) throw new ControllerError(`province with id: ${validatedEntity.provinceId} does not exist`);
        return;
    }
}