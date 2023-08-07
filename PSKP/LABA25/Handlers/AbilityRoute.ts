import express, {NextFunction, Request, Response} from 'express';

const router = express.Router();


router.get("/",async (req: Request, res: Response) => {
    if (req.ability) {
        res.status(200).send(req.ability.rules);
    } else {
        res.status(401).send('Unauthorized');
    }
});

export default router;