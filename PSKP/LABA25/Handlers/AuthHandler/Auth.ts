import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
import casl from "casl";

dotenv.config();

const secretKeyForAccess = process.env.SECRET_ACCES as string;



export const TokenValidation =(req : Request,res:Response,next:NextFunction)=> {
    const { rules, can, cannot } = casl.AbilityBuilder.extract();
    const {accessToken} = req.cookies;
    if (accessToken) {
        try {
            const {username, password,role,id} = jwt.verify(accessToken, secretKeyForAccess) as {
                username: string; password: string; role:string; id:number;
            }
            req.authInfo = {username, password,role,id};
            if (req.authInfo.role === 'admin') {
                can('manage', 'all');
            }
            else{
                can(['read', 'create', 'update'], ['Repos', 'Commits'], { authorId: req.authInfo.id });
                can('read', 'UsersCASL', { id: req.authInfo.id });
            }


        } catch (e) {
            delete req.authInfo;
        }
    }
    else{
        req.authInfo = { guest: true };
        can('read', ['Repos', 'Commits'], 'all');
    }
    req.ability = new casl.Ability(rules);
    next();
}

