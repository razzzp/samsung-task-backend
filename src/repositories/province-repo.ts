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
}