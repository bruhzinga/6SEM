import express from 'express';

import { PrismaClient } from '@prisma/client';
import InventoryController from "../Controllers/InventoryController";

export function getController(prisma: PrismaClient) {
    const controller = new InventoryController(prisma);
    const router = express.Router();
    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.post('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
}