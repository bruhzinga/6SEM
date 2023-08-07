// src/Controllers/BookController.ts

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

class CategoriesController {
    prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    getAll = async (req: Request, res: Response) => {

        const categories = await this.prisma.categories.findMany();
        res.render('categories.hbs', { categories });


    };

    getById = async (req: Request, res: Response) => {
        const categoryId = parseInt(req.params.id);
        const category = await this.prisma.categories.findUnique({
            where: { Category_ID: categoryId },
        });
        res.render('categories.hbs', { category });
    }

    create = async (req: Request, res: Response) => {
        const { name } = req.body;

        try {
            const newCategory = await this.prisma.categories.create({
                data: {
                    Category_name: name
                }
            });

            res.redirect('/categories');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    };

    update = async (req: Request, res: Response) => {
        const categoryId = Number(req.params.id);
        const { name } = req.body;

        try {
            const updatedCategory = await this.prisma.categories.update({
                where: {
                    Category_ID: categoryId
                },
                data: {
                    Category_name: name
                }
            });

            if (!updatedCategory) {
                return res.status(404).send('Category not found');
            }

            res.redirect('/categories');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    };


    delete = async (req: Request, res: Response) => {
        const categoryId = Number(req.params.id);

        try {
            const deletedCategory = await this.prisma.categories.delete({
                where: {
                    Category_ID: categoryId
                }
            });

            if (!deletedCategory) {
                return res.status(404).send('Category not found');
            }

            res.redirect('/categories');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    };

}

export default CategoriesController;
