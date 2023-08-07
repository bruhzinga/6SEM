"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InventoryController {
    constructor(prisma) {
        this.getAll = async (req, res) => {
            const inventories = await this.prisma.inventory.findMany({
                include: {
                    Books: true,
                },
            });
            res.render('inventory.hbs', { inventories });
        };
        this.getById = async (req, res) => {
            const inventoryId = parseInt(req.params.id);
            const inventory = await this.prisma.inventory.findUnique({
                where: { Inventory_ID: inventoryId },
                include: {
                    Books: true,
                },
            });
            res.render('inventory.hbs', { inventory });
        };
        this.create = async (req, res) => {
            const { ISBN, copies_in_stock, location } = req.body;
            try {
                const newItem = await this.prisma.inventory.create({
                    data: {
                        Books: {
                            connect: {
                                ISBN: ISBN
                            }
                        },
                        Copies_in_stock: parseInt(copies_in_stock),
                        Location: location,
                    }
                });
                res.redirect('/inventory');
            }
            catch (error) {
                console.error(error);
                res.status(500).json(error);
            }
        };
        this.update = async (req, res) => {
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
            }
            catch (error) {
                console.error(error);
                res.status(500).send(error);
            }
        };
        this.delete = async (req, res) => {
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
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal server error');
            }
        };
        this.prisma = prisma;
    }
}
exports.default = InventoryController;
//# sourceMappingURL=InventoryController.js.map