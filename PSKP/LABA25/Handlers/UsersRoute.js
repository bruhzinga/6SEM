import express from 'express';
const router = express.Router();
import { UsersCASL } from "../models/userCasl.model.js";
import { getUserById, getUsers, users } from "../service/userService.js";
router.get("/", async (req, res) => {
    try {
        req.ability?.throwUnlessCan('manage', 'all');
        const user = getUsers();
        const formattedUsers = users.map((user) => {
            return {
                ...user,
                password: undefined
            };
        });
        res.status(200).json(formattedUsers);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
router.get("/:id", async (req, res) => {
    try {
        req.ability?.throwUnlessCan('read', new UsersCASL(+req.params.id));
        const id = +req.params.id;
        const user = getUserById(id);
        if (user) {
            res.status(200).json({
                ...user,
                password: undefined
            });
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
});
export default router;
//# sourceMappingURL=UsersRoute.js.map