import express, {NextFunction} from 'express';
import bodyParser from "body-parser"
import {Request,Response} from "express";
import BasicStrategy from "passport-http";
import Session from 'express-session';
import passport from "./localPassport.js";
import * as fs from "fs";

declare module 'express-session' {
    interface SessionData {
        authenticated: boolean;
    }
}

const app = express();

const session = Session({
    resave: false,
    saveUninitialized: false,
    secret:'123456789'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));





app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use((req:Request, res:Response, next)=>{
    console.log(req.method, decodeURI(req.url));
    next();
})

app.get('/login',(req: Request, res: Response) => {
    const rs = fs.createReadStream('login.html');
    rs.pipe(res);
});

app.post('/login', passport.authenticate('local', { session: true ,successRedirect:'/resource'}), (req: Request, res: Response) => {
});

app.get('/logout', (req: Request, res: Response) => {
    req.logout((err: any) => {
        if (err) {
            console.log(err);
        }
    });
    res.send('Logout success');
});

app.get('/resource', (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}, (req: Request, res: Response) => {
    res.send('Resource');
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('Not found');
});

app.listen(3000, () => {
    console.log(`Server started at http://localhost:3000`);
});


