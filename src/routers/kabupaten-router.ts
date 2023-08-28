import { Router } from "express";
import { ControllerFactory } from "../factories/controller-factory";
import { wrapTryCatch } from "../utils";

const router = Router()

router.get('/', wrapTryCatch(async (req, res, next) => {
    const controller = ControllerFactory.buildKabupatenController();
    const kabupatens= await controller.getAllEntities();
    return res.send(kabupatens);
}));

router.post('/', wrapTryCatch(async (req, res, next) => {
    const controller = ControllerFactory.buildKabupatenController();
    const newKabupaten= await controller.createEntity(req.body);
    return res.send(newKabupaten);
}));

router.get('/:id', wrapTryCatch(async (req, res, next) => {
    const controller = ControllerFactory.buildKabupatenController();
    const kabupaten = await controller.getEntityById(req.params.id);
    return res.send(kabupaten);
}));

router.put('/:id', wrapTryCatch(async (req, res, next) => {
    const provinceController = ControllerFactory.buildKabupatenController();
    const kabupaten = await provinceController.updateOrCreateEntityById(req.params.id, req.body);
    return res.send(kabupaten);
}));

router.delete('/:id', wrapTryCatch(async (req, res, next) => {
    const provinceController = ControllerFactory.buildKabupatenController();
    await provinceController.deleteById(req.params.id);
    return res.send();
}));

export {router as kabupatenRouter};