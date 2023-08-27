import { Controller, IController } from "../controllers/controller";
import { IKabupaten } from "../entities/kabupaten";
import { IProvince } from "../entities/province-entity";
import { ProvinceRepo } from "../repositories/province-repo";
import { KabupatenDataValidator, ProvinceDataValidator } from "../validators/data-validator";
import { ProvinceViewBuilder } from "../view-builders/view-builder";
import { RepoFactory } from "./repo-factory";


export class ControllerFactory{
    public static buildProvinceController() : IController<IProvince, Object>{
        const repo = RepoFactory.buildProvinceRepo_2();
        const dataValidator = new ProvinceDataValidator();
        const viewBuilder = new ProvinceViewBuilder();
        return new Controller<IProvince, Object>(repo, dataValidator, viewBuilder);
    }
    public static buildKabupatenController() : IController<IKabupaten, Object>{
        const repo = RepoFactory.buildKabupatenRepo();
        const dataValidator = new KabupatenDataValidator();
        const viewBuilder = new ProvinceViewBuilder();
        return new Controller<IKabupaten, Object>(repo, dataValidator, viewBuilder);
    }
}