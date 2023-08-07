import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

class InventoryController {
    prisma: PrismaClient;


    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    getAll = async (req: Request, res: Response) => {

        const inventories = await this.prisma.inventory.findMany({
            include: {
                Books: true,
            },
        });
        res.render('inventory.hbs', { inventories });


    };

    getById = async (req: Request, res: Response) => {
        const inventoryId = parseInt(req.params.id);
        const inventory = await this.prisma.inventory.findUnique({
            where: { Inventory_ID: inventoryId },
            include: {
                Books: true,
            },
        });
        res.render('inventory.hbs', { inventory });
    }

    create = async (req: Request, res: Response) => {
        const { ISBN, copies_in_stock, location } = req.body;

        try {
            const newItem = await this.prisma.inventory.create({
                data: {
                    Books:{
                        connect:{
                            ISBN:ISBN
                        }
                    },
                    Copies_in_stock: parseInt(copies_in_stock),
                    Location: location,
                }
            });

            res.redirect('/inventory');
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    };

    update = async (req: Request, res: Response) => {
        const inventoryId = Number(req.params.id);
        const { ISBN, copies_in_stock, location } = req.body;

        try {
            const updatedItem = await this.prisma.inventory.update({
                where: {
                    Inventory_ID: inventoryId
                },
                data: {
                    ISBN,
                    Copies_in_stock: parseInt(copies_in_stock),
                    Location: location,
                }
            });

            if (!updatedItem) {
                return res.status(404).send('Item not found');
            }

            res.redirect('/inventory');
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    };


    delete = async (req: Request, res: Response) => {
        const inventoryId = Number(req.params.id);

        try {
            const deletedItem = await this.prisma.inventory.delete({
                where: {
                    Inventory_ID: inventoryId
                }
            });

            if (!deletedItem) {
                return res.status(404).send('Item not found');
            }

            res.redirect('/inventory');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    };
}

export default InventoryController;