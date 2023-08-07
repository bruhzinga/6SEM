import express, {NextFunction} from 'express';
import bodyParser from "body-parser"
import {Request,Response} from "express";
import * as fs from "fs";
import jwt from "jsonwebtoken"


import cookieParser from "cookie-parser";
import {checkUser, createUser} from "./service/userService.js";
import {AddTokenToBlackList, IsTokenInBlackList} from "./service/redisService.js";
import {TokenValidation} from "./Handlers/AuthHandler/Auth.js";
import AuthRouter from "./Handlers/AuthHandler/AuthRouter.js";
import UsersRouter from './Handlers/UsersRoute.js';
import AbilityRouter from './Handlers/AbilityRoute.js';
import ReposRouter from './Handlers/ReposRoute.js';
import casl from 'casl';





const app = express();

declare module 'express' {
    interface Request {
        authInfo?: any;
        ability?: casl.Ability;
    }
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


app.use(TokenValidation);


app.use((req:Request, res:Response, next)=>{
    console.log(req.method, decodeURI(req.url));
    next();
})

app.use('/',AuthRouter);
app.use('/api/users', UsersRouter);
app.use('/api/ability', AbilityRouter);
app.use('/api/repos', ReposRouter);




app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('Not found');
});

app.listen(3000, () => {
    console.log(`Server started at http://localhost:3000`);
});


