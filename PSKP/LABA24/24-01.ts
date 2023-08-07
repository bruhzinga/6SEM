import express from 'express';
import bodyParser from "body-parser"
import {Request,Response} from "express";
import Session from 'express-session';
import passport from "./OAUTHPassport.js";
import * as fs from "fs";


const app = express();




const session = Session({
    resave: false,   //Forces the session to be saved back to the session store, even if the session was never modified during the reques
    saveUninitialized: false, //Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified
    secret:'123456789' //This is the secret used to sign the session ID cookie. This can be either a string for a single secret, or an array of multiple secrets
});


app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use((req:Request, res:Response, next)=>{
    console.log(req.method, decodeURI(req.url));
    next();
})

app.use(bodyParser.json()); //utilizes the body-parser package
app.use(bodyParser.urlencoded({extended: true}));



app.get('/login', (req:Request, res:Response) => {
    fs.createReadStream('login.html').pipe(res);
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    function(req:Request, res:Response) {
        res.redirect('/resource');
    });

app.get('/resource', (req:Request, res:Response) => {
    if(req.user){
        console.log(req.user);
        // @ts-ignore
        res.status(200).send("Hello, " + req.user.displayName + "!");
    }
    else{
        res.redirect('/login');
    }
});

app.get('/logout', (req:Request, res:Response) => {
    req.logout(()=>{
        console.log("Logout");
    });
    res.redirect('/login');
});




app.listen(3000,()=>{
    console.log("Server running")
});