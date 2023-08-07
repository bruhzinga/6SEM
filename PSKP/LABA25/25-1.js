import express from 'express';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { TokenValidation } from "./Handlers/AuthHandler/Auth.js";
import AuthRouter from "./Handlers/AuthHandler/AuthRouter.js";
import UsersRouter from './Handlers/UsersRoute.js';
import AbilityRouter from './Handlers/AbilityRoute.js';
import ReposRouter from './Handlers/ReposRoute.js';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(TokenValidation);
app.use((req, res, next) => {
    console.log(req.method, decodeURI(req.url));
    next();
});
app.use('/', AuthRouter);
app.use('/api/users', UsersRouter);
app.use('/api/ability', AbilityRouter);
app.use('/api/repos', ReposRouter);
app.use((req, res, next) => {
    res.status(404).send('Not found');
});
app.listen(3000, () => {
    console.log(`Server started at http://localhost:3000`);
});
//# sourceMappingURL=25-1.js.map