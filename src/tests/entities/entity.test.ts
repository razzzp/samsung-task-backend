import { Entity } from "../../entities/entity";


describe('test entity class', ()=>{
    test('test getter and setter', ()=>{
        const entity = new Entity();
        expect(entity.get('id')).toBeUndefined;
        entity.set('id', 1);
        expect(entity.get('id')).toBe(1);
    });

    test('test set field', ()=>{
        const entity = new Entity();
        expect(entity.get('id')).toBeUndefined;
        entity.id = 1
        expect(entity.get('id')).toBe(1);
    });
});