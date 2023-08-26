import { Router } from "express";
import { ControllerFactory } from "../factories/controller-factory";

const router = Router()

router.get('/', (req, res) => {
    return ControllerFactory.buildProvinceController().getEntities(req, res);
});

export {router as provinceRouter};