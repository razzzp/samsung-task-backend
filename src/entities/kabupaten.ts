import { Entity, IEntity, Id, Ref } from "./entity";
import { IProvince } from "./province";



export interface IKabupaten extends IEntity{
    provinceId: Id;
    province: Ref<IProvince>;
}

export class Kabupaten extends Entity implements IKabupaten{
    provinceId: Id;
    province: Ref<IProvince>;
}