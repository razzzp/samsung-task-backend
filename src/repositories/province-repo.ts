import mysql from "mysql2/promise";
import { IProvince, Province } from "../entities/province-entity";
import { IRepo } from "./id-repo";



export class ProvinceRepo implements IRepo<Province>{


    private _pool : mysql.Pool;
    /**
     *
     */
    constructor(sqlPool : mysql.Pool) {
        this._pool = sqlPool  
    }
    getById(id: number): Promise<Province> {
        throw new Error("Method not implemented.");
    }
    getMany(filter: Partial<Province>): Promise<Province[]> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<Province> {
        throw new Error("Method not implemented.");
    }
    save(entity: Province): Promise<Province> {
        throw new Error("Method not implemented.");
    }
}