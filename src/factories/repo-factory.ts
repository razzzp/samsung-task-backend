
import { ProvinceModel, createSQLPool } from "../data-source";
import { ProvinceRepo } from "../repositories/province-repo";
import { Repo } from "../repositories/repo";
import { IProvince, Province } from "../entities/province-entity";
import mysql from "mysql2/promise"
import sequelize, { Sequelize } from "sequelize";
import { KabupatenSequelizeRepo, ProvinceSequelizeRepo } from "../repositories/sequelize-repo";

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

    public static buildProvinceRepo_2(){
        return new ProvinceSequelizeRepo();
    }

    public static buildKabupatenRepo(){
        return new KabupatenSequelizeRepo();
    }
}