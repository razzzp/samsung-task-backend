import { Router } from "express";
import { ControllerFactory } from "../factories/controller-factory";

const router = Router()

router.get('/', async (req, res) => {
    return await ControllerFactory.buildProvinceController().getEntities(req, res);
});

router.get('/:id', async (req, res) => {
    const id = Number.parseInt(req.params.id);
    return await ControllerFactory.buildProvinceController().getEntityById(id, res);
});

export {router as provinceRouter};