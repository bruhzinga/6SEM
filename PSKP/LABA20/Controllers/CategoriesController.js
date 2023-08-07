"use strict";
// src/Controllers/BookController.ts
Object.defineProperty(exports, "__esModule", { value: true });
class CategoriesController {
    constructor(prisma) {
        this.getAll = async (req, res) => {
            const categories = await this.prisma.categories.findMany();
            res.render('categories.hbs', { categories });
        };
        this.getById = async (req, res) => {
            const categoryId = parseInt(req.params.id);
            const category = await this.prisma.categories.findUnique({
                where: { Category_ID: categoryId },
            });
            res.render('categories.hbs', { category });
        };
        this.create = async (req, res) => {
            const { name } = req.body;
            try {
                const newCategory = await this.prisma.categories.create({
                    data: {
                        Category_name: name
                    }
                });
                res.redirect('/categories');
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal server error');
            }
        };
        this.update = async (req, res) => {
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
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal server error');
            }
        };
        this.delete = async (req, res) => {
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
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal server error');
            }
        };
        this.prisma = prisma;
    }
}
exports.default = CategoriesController;
//# sourceMappingURL=CategoriesController.js.map