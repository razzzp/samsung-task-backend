import { Router } from "express";
import { ControllerFactory } from "../factories/controller-factory";

const router = Router()

router.get('/', async (req, res) => {
    const controller = ControllerFactory.buildKabupatenController();
    const kabupatens= await controller.getAllEntities();
    return res.send(kabupatens);
});

router.post('/', async (req, res) => {
    const controller = ControllerFactory.buildKabupatenController();
    const newKabupaten= await controller.createEntity(req.body);
    return res.send(newKabupaten);
});

router.get('/:id', async (req, res) => {
    const controller = ControllerFactory.buildKabupatenController();
    const kabupaten = await controller.getEntityById(req.params.id);
    return res.send(kabupaten);
});

router.put('/:id', async (req, res) => {
    const provinceController = ControllerFactory.buildKabupatenController();
    const kabupaten = await provinceController.updateOrCreateEntityById(req.params.id, req.body);
    return res.send(kabupaten);
});

router.delete('/:id', async (req, res) => {
    const provinceController = ControllerFactory.buildKabupatenController();
    await provinceController.deleteById(req.params.id);
    return res.send();
});

export {router as kabupatenRouter};