import express from 'express';
const router = express.Router();
router.get("/", async (req, res) => {
    if (req.ability) {
        res.status(200).send(req.ability.rules);
    }
    else {
        res.status(401).send('Unauthorized');
    }
});
export default router;
//# sourceMappingURL=AbilityRoute.js.map