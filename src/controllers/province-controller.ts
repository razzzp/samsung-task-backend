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
    public getEntities(req : Request, res: Response) :  any {
        return res.send("hello");
    }
}