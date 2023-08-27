import { ProvinceDataValidator } from "../../validators/data-validator"

const provinceValidator = new ProvinceDataValidator();

describe('test ProvinceDataValidator class', () => {
    test('test post data', ()=>{
        expect(
            provinceValidator.validatePostData({
                name: 'Lampung'
            })
        ).toMatchObject({
            name: 'Lampung'
        })
    })


    test('test post data with id', ()=>{
        expect(()=>{
            provinceValidator.validatePostData({
                id: 4,
                name: 'Lampung'
            })
        }).toThrowError()
    })

    test('test post data with invalid name', ()=>{
        expect(() => {
            provinceValidator.validatePostData({
                name: 'Lampung123'
            })
        }).toThrowError()
    })

    test('test post data with name leading/trailling whitespace', ()=>{
        expect(
            provinceValidator.validatePostData({
                name: '   Daerah Ibu Kota Jakarta   '
            })
        ).toMatchObject({
            name: 'Daerah Ibu Kota Jakarta'
        })
    })
})