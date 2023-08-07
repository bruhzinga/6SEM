"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthorController {
    constructor(Prisma) {
        this.Get = async (req, res) => {
            try {
                const authors = await this.prisma.authors.findMany();
                res.render('authors.hbs', { authors });
            }
            catch (error) {
                console.error(error);
                res.status(500).json(error);
            }
        };
        this.Post = async (req, res) => {
            const { name, dateOfBirth, bio, nationality } = req.body;
            const author = await this.prisma.authors.create({
                data: {
                    Name: name,
                    Date_of_birth: new Date(dateOfBirth),
                    Bio: bio,
                    Nationality: nationality,
                },
            });
            res.redirect('/authors');
        };
        this.PostWithID = async (req, res) => {
            const { id } = req.params;
            const { name, dateOfBirth, bio, nationality } = req.body;
            const author = await this.prisma.authors.update({
                where: { Author_ID: parseInt(id) },
                data: {
                    Name: name,
                    Date_of_birth: new Date(dateOfBirth),
                    Bio: bio,
                    Nationality: nationality,
                },
            });
            res.redirect('/authors');
        };
        this.GetById = async (req, res) => {
            const { id } = req.params;
            const author = await this.prisma.authors.findUnique({
                where: { Author_ID: parseInt(id) },
            });
            res.render('authors.hbs', { author });
        };
        this.Delete = async (req, res) => {
            const { id } = req.params;
            const author = await this.prisma.authors.delete({
                where: { Author_ID: parseInt(id) },
            });
            res.redirect('/authors');
        };
        this.prisma = Prisma;
    }
}
exports.default = AuthorController;
//# sourceMappingURL=AuthorController.js.map