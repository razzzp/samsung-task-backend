import { Router } from "express";
import { ControllerFactory } from "../factories/controller-factory";
import { wrapTryCatch } from "../utils";

const router = Router()

router.get('/', wrapTryCatch(async (req, res, next) => {
    const provinceController = ControllerFactory.buildProvinceController();
    const provinces= await provinceController.getAllEntities();
    return res.send(provinces);
}));

router.post('/', wrapTryCatch(async (req, res, next) => {
    const provinceController = ControllerFactory.buildProvinceController();
    const newProvince= await provinceController.createEntity(req.body);
    return res.send(newProvince);
}));

router.get('/:id', wrapTryCatch(async (req, res, next) => {
    const provinceController = ControllerFactory.buildProvinceController();
    const province = await provinceController.getEntityById(req.params.id);
    return res.send(province);
}));

router.put('/:id', wrapTryCatch(async (req, res, next) => {
    const provinceController = ControllerFactory.buildProvinceController();
    const province = await provinceController.updateOrCreateEntityById(req.params.id, req.body);
    return res.send(province);
}));

router.delete('/:id', wrapTryCatch(async (req, res, next) => {
    const provinceController = ControllerFactory.buildProvinceController();
    await provinceController.deleteById(req.params.id);
    return res.send();
}));

export {router as provinceRouter};