import express, {NextFunction, Request, Response} from 'express';
import { PrismaClient } from '@prisma/client'
import {Repos} from "../models/repos.model.js";
import {Commits} from "../models/commits.model.js";
const prisma = new PrismaClient()

const router = express.Router();


router.get("/",async (req: Request, res: Response) => {
    try {
        req.ability?.throwUnlessCan('read', 'Repos');
        const repos = await prisma.repos.findMany();
        res.status(200).json(repos);
    } catch (err) {
        res.status(403).send(err);
    }
});

router.get("/:id",async (req: Request, res: Response) => {
    try {
        const repo = await prisma.repos.findUnique({ where: { id: +req.params.id } });
        if (repo) {
            req.ability?.throwUnlessCan('read', new Repos(repo?.authorId));
            res.status(200).json(repo);
        } else {
            res.status(404).send('Not found');
        }
    } catch (err) {
        res.status(403).send(err);
    }
});

router.post("/",async (req: Request, res: Response) => {
    try {
        req.ability?.throwUnlessCan('create', 'Repos');
        const repo = await prisma.repos.create({
            data: {
                authorId: req.authInfo.id,
                name: req.body.name
            }
        });
        res.status(201).json(repo);
    } catch (err) {
        res.status(403).send(err);
    }
});

router.put("/:id",async (req: Request, res: Response) => {
    try {
        const repo = await prisma.repos.findUnique({ where: { id: +req.params.id } });
        if (repo) {
            req.ability?.throwUnlessCan('update', new Repos(repo?.authorId));
            const repoUpd = await prisma.repos.update({
                where: { id: +req.params.id },
                data: {
                    name: req.body.name
                }
            });
            res.status(200).json(repoUpd);
        } else {
            res.status(404).send('Not found');
        }
    } catch (err) {
        res.status(403).send(err);
    }
});

router.delete("/:id",async (req: Request, res: Response) => {
    try {
        req.ability?.throwUnlessCan('manage', 'all');
        const repo = await prisma.repos.delete({ where: { id: +req.params.id } });
        if (repo) {
            res.status(200).json(repo);
        } else {
            res.status(404).send('Not found');
        }
    } catch (err) {
        res.status(403).send(err);
    }
});

router.get("/:id/commits",async (req: Request, res: Response) => {
    try {
        const commits = await prisma.commits.findMany({ where: { repoId: +req.params.id } });
        if (commits) {
            const repo = await prisma.repos.findUnique({ where: { id: +req.params.id } });
            req.ability?.throwUnlessCan('read', new Commits(repo?.authorId!));
            res.status(200).json(commits);
        } else {
            res.status(404).send('Not found');
        }
    } catch (err) {
        res.status(403).send(err);
    }
});

router.get('/:id/commits/:commitId', async (req: Request, res: Response) => {
    try {
        const commit = await prisma.commits.findUnique({ where: { id: +req.params.commitId } });
        if (commit) {
            const repo = await prisma.repos.findUnique({ where: { id: commit.repoId! } });
            req.ability?.throwUnlessCan('read', new Commits(repo?.authorId!));
            res.status(200).json(commit);
        } else {
            res.status(404).send('Not found');
        }
    } catch (err) {
        res.status(403).send(err);
    }
});

router.post('/:id/commits', async (req: Request, res: Response) => {
    try {
        const repo = await prisma.repos.findUnique({ where: { id: +req.params.id } });
        if (repo) {
            req.ability?.throwUnlessCan('create', new Repos(repo?.authorId!));
            const commit = await prisma.commits.create({
                data: {
                    message: req.body.message,
                    repoId: +req.params.id,
                }
            });
            res.status(201).json(commit);
        } else {
            res.status(404).send('Not found');
        }
    } catch (err) {
        res.status(403).send(err);
    }
});

router.put('/:id/commits/:commitId', async (req: Request, res: Response) => {
    try {
        const repo = await prisma.repos.findUnique({ where: { id: +req.params.id } });
        if (!repo) {
            res.status(404).send('Not found');
            return;
        }

        req.ability?.throwUnlessCan('update', new Repos(repo?.authorId!));
        const commit = await prisma.commits.update({
            where: { id: +req.params.commitId },
            data: {
                message: req.body.message
            }
        });
        if (commit) {
            res.status(200).json(commit);
        } else {
            res.status(404).send('Not found');
        }
    } catch (err) {
        res.status(403).send(err);
    }
});

router.delete('/:id/commits/:commitId', async (req: Request, res: Response) => {
    try {
        req.ability?.throwUnlessCan('manage', 'all');
        const commit = await prisma.commits.delete({ where: { id: +req.params.commitId } });
        if (commit) {
            res.status(200).json(commit);
        } else {
            res.status(404).send('Not found');
        }
    } catch (err) {
        res.status(403).send(err);
    }
});

export default router;