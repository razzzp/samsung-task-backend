import { IEntity } from "../entities/entity";
import { IProvince } from "../entities/province-entity";


export interface IViewBuilder<T extends IEntity, U>{
    buildView(entity: T) : U;

}

export class ProvinceViewBuilder implements IViewBuilder<IProvince, Object>{
    buildView(entity: IProvince): Object {
        return entity;
    }
}