
import express from 'express';

import { PrismaClient } from '@prisma/client';
import BookController from "../Controllers/BookController";

export function getBookRouter(prisma: PrismaClient) {
    const controller = new BookController(prisma);
    const router = express.Router();


        router.get('/', controller.getAll);
        router.get('/:id', controller.getById);
        router.post('/', controller.create);
        router.post('/:id', controller.update);
        router.delete('/:id', controller.delete);



    return router;
}
