import express from 'express';
import { PrismaClient } from '@prisma/client';
import DistributorsController from '../Controllers/DistributorsController';

export function getController(prisma: PrismaClient) {
    const controller = new DistributorsController(prisma);
    const router = express.Router();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.post('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
}