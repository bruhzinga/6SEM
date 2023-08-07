import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import casl from "casl";
dotenv.config();
const secretKeyForAccess = process.env.SECRET_ACCES;
export const TokenValidation = (req, res, next) => {
    const { rules, can, cannot } = casl.AbilityBuilder.extract();
    const { accessToken } = req.cookies;
    if (accessToken) {
        try {
            const { username, password, role, id } = jwt.verify(accessToken, secretKeyForAccess);
            req.authInfo = { username, password, role, id };
            if (req.authInfo.role === 'admin') {
                can('manage', 'all');
            }
            else {
                can(['read', 'create', 'update'], ['Repos', 'Commits'], { authorId: req.authInfo.id });
                can('read', 'UsersCASL', { id: req.authInfo.id });
            }
        }
        catch (e) {
            delete req.authInfo;
        }
    }
    else {
        req.authInfo = { guest: true };
        can('read', ['Repos', 'Commits'], 'all');
    }
    req.ability = new casl.Ability(rules);
    next();
};
//# sourceMappingURL=Auth.js.map