import express, {NextFunction} from 'express';
import bodyParser from "body-parser"
import {Request,Response} from "express";
import * as fs from "fs";
import jwt from "jsonwebtoken"
import {checkUser, createUser} from "../service/userService.js";
import cookieParser from "cookie-parser";
import {AddTokenToBlackList, IsTokenInBlackList} from "../service/redisService.js";


const secretKeyForRefresh ='123-qwerty-123-qwerty'
const secretKeyForAccess   = 'qwerty-123-qwerty-123'


const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


app.use((req : Request,res:Response,next)=>{
    const {accessToken} = req.cookies;
    if(accessToken) {
        try {
            const {username, password} = jwt.verify(accessToken, secretKeyForAccess) as {
                username: string; password: string;
            }
            req.authInfo = {username, password};
        } catch (e) {
            delete req.authInfo;
        }
    }
    
    next();


});







app.use((req:Request, res:Response, next)=>{
    console.log(req.method, decodeURI(req.url));
    next();
})

app.get('/register',(req: Request, res: Response) => {
    const rs = fs.createReadStream('register.html');
    rs.pipe(res);
});

app.post('/register', async (req: Request, res: Response) => {
    const {username, password} = req.body;
    if (checkUser(username, password)) {
        res.status(400).json({message: "User already exists"});
    } else {
        await createUser(username, password);
        res.redirect('/login');
    }
});



app.get('/login',(req: Request, res: Response) => {
    const rs = fs.createReadStream('login.html');
    rs.pipe(res);
});

app.post('/login',(req: Request, res: Response) => {
    const {username,password} =req.body;
    if (checkUser(username,password)){
        const refreshToken = jwt.sign({username,password},secretKeyForRefresh,{expiresIn: "24h"});
        const accessToken = jwt.sign({username,password},secretKeyForAccess,{expiresIn: "10s"});
        res.cookie('refreshToken',refreshToken,{path:'/refresh'});
        res.cookie('refreshToken',refreshToken,{path:'/logout'});
        res.cookie('accessToken',accessToken,{httpOnly:true, sameSite:"strict" ,});
        res.redirect('/resource');
    }
    else{
        res.redirect('/login');
    }


});


app.get(`/refresh`,async (req, res, next) => {
    const {refreshToken, accessToken} = req.cookies;
    console.log(req.cookies)
    if(!refreshToken || !accessToken) return res.status(401).json({message: "Token not valid"}  );
    if (jwt.verify(refreshToken, secretKeyForRefresh) && !await IsTokenInBlackList(refreshToken)) {
        const {username, password} = jwt.decode(accessToken) as {
            username: string; password: string;
        }
        await AddTokenToBlackList(accessToken);
        const newAccessToken = jwt.sign({username, password}, secretKeyForAccess, {expiresIn: "10m"});
        const newRefreshToken = jwt.sign({username, password}, secretKeyForRefresh, {expiresIn: "24h"});
        res.cookie('accessToken', newAccessToken, {httpOnly: true, sameSite: "strict",});
        res.cookie('refreshToken', newRefreshToken, {path:'/refresh'});
        res.cookie('refreshToken', newRefreshToken, {path:'/logout'});
        req.authInfo = {username, password};
        res.redirect('/resource');
    }
    else {
        res.status(401).json({message: "Token not valid"});
    }
})

app.get('/logout', async (req: Request, res: Response) => {
    const {refreshToken} = req.cookies;
    console.log(req.cookies)
    await AddTokenToBlackList(refreshToken);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    delete req.authInfo;
    res.redirect('/login');

});

app.get('/resource', (req: Request, res: Response, next: NextFunction) => {
    if(req.authInfo) return res.json(req.authInfo);
    else {
        res.status(401).json({message:"Unauthorised"});
    }
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('Not found');
});

app.listen(3000, () => {
    console.log(`Server started at http://localhost:3000`);
});


