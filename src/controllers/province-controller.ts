import { Entity, IEntity } from "../entities/id-entity";
import { IRepo } from "../repositories/id-repo";
import { Request, Response } from "express";

export class Controller<T extends IEntity> {

    private _repo: IRepo<T>;

    /**
     *
     */
    constructor(repo: IRepo<T>, ) {
        this._repo = repo;
    }
    public async getEntities(req : Request, res: Response) :  Promise<any> {
        const result = await this._repo.getMany({});
        return res.send(result);
    }

    public async getEntityById(id :number, res: Response) :  Promise<any> {
        const result = await this._repo.getById(id);
        return res.send(result);
    }
}