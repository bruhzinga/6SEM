import express from 'express';
import AuthorController from "../Controllers/AuthorController.js"
import {PrismaClient} from "@prisma/client";

export function GetRouter(prisma:PrismaClient)
{

    const controller = new AuthorController(prisma);
    const router = express.Router();
    router.get("/",controller.Get)
    router.get("/:id",controller.GetById)
    router.post("/",controller.Post)
    router.post("/:id",controller.PostWithID)
    router.delete("/:id",controller.Delete)

    return router;
}





