"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DistributorsController {
    constructor(prisma) {
        this.getAll = async (req, res) => {
            const distributors = await this.prisma.distributors.findMany({ include: { Books: true } });
            res.render('distributors.hbs', { distributors });
        };
        this.getById = async (req, res) => {
            const distributorId = parseInt(req.params.id);
            const distributor = await this.prisma.distributors.findUnique({
                where: { Distributor_ID: distributorId },
                include: { Books: true }
            });
            res.render('distributors.hbs', { distributor });
        };
        this.create = async (req, res) => {
            const { name, address, contactInfo } = req.body;
            try {
                const newDistributor = await this.prisma.distributors.create({
                    data: {
                        Name: name,
                        Address: address,
                        Contact_info: contactInfo
                    }
                });
                res.redirect('/distributors');
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal server error');
            }
        };
        this.update = async (req, res) => {
            const distributorId = Number(req.params.id);
            const { name, address, contactInfo } = req.body;
            try {
                const updatedDistributor = await this.prisma.distributors.update({
                    where: {
                        Distributor_ID: distributorId
                    },
                    data: {
                        Name: name,
                        Address: address,
                        Contact_info: contactInfo
                    }
                });
                if (!updatedDistributor) {
                    return res.status(404).send('Distributor not found');
                }
                res.redirect('/distributors');
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal server error');
            }
        };
        this.delete = async (req, res) => {
            const distributorId = Number(req.params.id);
            try {
                const deletedDistributor = await this.prisma.distributors.delete({
                    where: {
                        Distributor_ID: distributorId
                    }
                });
                if (!deletedDistributor) {
                    return res.status(404).send('Distributor not found');
                }
                res.redirect('/distributors');
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal server error');
            }
        };
        this.prisma = prisma;
    }
}
exports.default = DistributorsController;
//# sourceMappingURL=DistributorsController.js.map