import express, {NextFunction} from 'express';
import bodyParser from "body-parser"
import {Request,Response} from "express";
import BasicStrategy from "passport-http";
import Session from 'express-session';
import passport from "./basicPassport.js";

declare module 'express-session' {
    interface SessionData {
        authenticated: boolean;
    }
}

const app = express();

const session = Session({
    resave: false,   //Forces the session to be saved back to the session store, even if the session was never modified during the reques
    saveUninitialized: false, //Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified
    secret:'123456789' //This is the secret used to sign the session ID cookie. This can be either a string for a single secret, or an array of multiple secrets
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


app.get('/login', passport.authenticate('basic', { session: true }), (req: Request, res: Response) => {
    req.session.authenticated = true;
    res.send('Login success');
});

app.get('/logout', (req: Request, res: Response) => {
    req.session.authenticated = false;
    res.send('Logout success');
});

app.get('/resource', (req: Request, res: Response, next: NextFunction) => {
    if (req.session.authenticated) {
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


