import { Controller } from "../controllers/province-controller";
import { IProvince } from "../entities/province-entity";
import { ProvinceRepo } from "../repositories/province-repo";
import { RepoFactory } from "./repo-factory";


export class ControllerFactory{
    public static buildProvinceController() : Controller<IProvince>{
        const repo = RepoFactory.buildProvinceRepo();
        return new Controller<IProvince>(repo);
    }
}