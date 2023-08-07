"use strict";
// src/Controllers/BookController.ts
Object.defineProperty(exports, "__esModule", { value: true });
class BookController {
    constructor(prisma) {
        this.getAll = async (req, res) => {
            let booksToReturn = await this.prisma.books.findMany({
                include: {
                    Authors: true,
                    Categories: true,
                    Distributors: true,
                },
            });
            let books = booksToReturn.map((x) => {
                return {
                    ...x,
                    Publication_date: x.Publication_date.toDateString()
                };
            });
            res.render('books.hbs', { books });
        };
        this.getById = async (req, res) => {
            const { id } = req.params;
            const book = await this.prisma.books.findUnique({
                where: { ISBN: id },
                include: {
                    Authors: true,
                    Categories: true,
                    Distributors: true,
                },
            });
            res.render('books.hbs', { book });
        };
        this.create = async (req, res) => {
            const { ISBN, title, Author_id, Publication_date, Category_ID, Description, Distributor_ID, } = req.body;
            const book = await this.prisma.books.create({
                data: {
                    ISBN: ISBN,
                    Title: title,
                    Authors: {
                        connect: {
                            Author_ID: parseInt(Author_id),
                        }
                    },
                    Publication_date: new Date(Publication_date),
                    Categories: {
                        connect: {
                            Category_ID: parseInt(Category_ID),
                        }
                    },
                    Description,
                    Distributors: {
                        connect: {
                            Distributor_ID: parseInt(Distributor_ID),
                        }
                    }
                },
                include: {
                    Authors: true,
                    Categories: true,
                    Distributors: true,
                },
            });
            res.redirect('/books');
        };
        this.update = async (req, res) => {
            const { id } = req.params;
            const { title, Author_id, Publication_date, Category_ID, Description, Distributor_ID, } = req.body;
            const book = await this.prisma.books.update({
                where: { ISBN: id },
                data: {
                    Title: title,
                    Authors: {
                        connect: {
                            Author_ID: parseInt(Author_id),
                        }
                    },
                    Publication_date: new Date(Publication_date),
                    Categories: {
                        connect: {
                            Category_ID: parseInt(Category_ID),
                        }
                    },
                    Description,
                    Distributors: {
                        connect: {
                            Distributor_ID: parseInt(Distributor_ID),
                        }
                    }
                },
                include: {
                    Authors: true,
                    Categories: true,
                    Distributors: true,
                },
            });
            res.redirect('/books');
        };
        this.delete = async (req, res) => {
            const { id } = req.params;
            const book = await this.prisma.books.delete({
                where: { ISBN: id },
            });
            res.redirect('/books');
        };
        this.prisma = prisma;
    }
}
exports.default = BookController;
//# sourceMappingURL=BookController.js.map