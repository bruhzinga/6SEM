import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

class DistributorsController {
    prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    getAll = async (req: Request, res: Response) => {
        const distributors = await this.prisma.distributors.findMany({ include: { Books: true } });
        res.render('distributors.hbs', { distributors });
    };

    getById = async (req: Request, res: Response) => {
        const distributorId = parseInt(req.params.id);
        const distributor = await this.prisma.distributors.findUnique({
            where: { Distributor_ID: distributorId },
            include: { Books: true }
        });
        res.render('distributors.hbs', { distributor });
    }

    create = async (req: Request, res: Response) => {
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
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    };

    update = async (req: Request, res: Response) => {
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
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    };


    delete = async (req: Request, res: Response) => {
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
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    };

}

export default DistributorsController;