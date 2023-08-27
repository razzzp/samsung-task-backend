import { Entity, IEntity, Id, Ref } from "./entity";
import { IProvince } from "./province-entity";



export interface IKabupaten extends IEntity{
    province: Ref<IProvince>;
}

export class Kabupaten extends Entity implements IKabupaten{
    province: Ref<IProvince>;
}