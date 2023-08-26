
import { createSQLPool } from "../data-source";
import { ProvinceRepo } from "../repositories/province-repo";
import { Repo } from "../repositories/id-repo";
import { Province } from "../entities/province-entity";
import mysql from "mysql2/promise"

export class RepoFactory {
    private static _sqlPool : mysql.Pool;
    private static getSQLPool() {
        if (!RepoFactory._sqlPool){
            RepoFactory._sqlPool = createSQLPool();
        }
        return this._sqlPool;
    }

    public static buildProvinceRepo(){
        return new Repo<Province>(Province, RepoFactory.getSQLPool());
    }
}