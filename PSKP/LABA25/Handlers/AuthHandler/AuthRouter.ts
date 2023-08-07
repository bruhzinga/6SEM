import express, {NextFunction, Request, Response} from 'express';
import fs from "fs";
import {checkUser, createUser, getUser} from "../../service/userService.js";
import jwt from "jsonwebtoken";
import {AddTokenToBlackList, IsTokenInBlackList} from "../../service/redisService.js";
import {users} from "@prisma/client";

const router = express.Router();
const secretKeyForAccess = process.env.SECRET_ACCES as string;
const secretKeyForRefresh = process.env.SECRET_REFRESH as string;


router.get('/register',(req: Request, res: Response) => {
    const rs = fs.createReadStream('register.html');
    rs.pipe(res);
});

router.post('/register', async (req: Request, res: Response) => {
    const {username, password,role,email} = req.body;
    if (checkUser(username, password)) {
        res.status(400).json({message: "User already exists"});
    } else {
        await createUser(username, password,role,email);
        res.redirect('/login');
    }
});



router.get('/login',(req: Request, res: Response) => {
    const rs = fs.createReadStream('login.html');
    rs.pipe(res);
});

router.post('/login',(req: Request, res: Response) => {
    const {username,password} =req.body;
    if (checkUser(username,password)){
        const user =  getUser(username) as users;
        const {role,id} = user;
        const refreshToken = jwt.sign({username,id,role},secretKeyForRefresh,{expiresIn: "24h"});
        const accessToken = jwt.sign({username,id,role},secretKeyForAccess,{expiresIn: "10m"});
        res.cookie('refreshToken',refreshToken,{path:'/refresh'});
        res.cookie('refreshToken',refreshToken,{path:'/logout'});
        res.cookie('accessToken',accessToken,{httpOnly:true, sameSite:"strict" ,});
        res.redirect('/resource');
    }
    else{
        res.redirect('/login');
    }


});


router.get(`/refresh`,async (req, res, next) => {
    const {refreshToken, accessToken} = req.cookies;
    console.log(req.cookies)
    if(!refreshToken || !accessToken) return res.status(401).json({message: "Token not valid"}  );
    if (jwt.verify(refreshToken, secretKeyForRefresh) && !await IsTokenInBlackList(refreshToken)) {
        const {username, password,id,role} = jwt.decode(accessToken) as {
            username: string; password: string; id: number; role: string;
        }
        await AddTokenToBlackList(accessToken);
        const newAccessToken = jwt.sign({username,id,role}, secretKeyForAccess, {expiresIn: "10m"});
        const newRefreshToken = jwt.sign({username,id,role}, secretKeyForRefresh, {expiresIn: "24h"});
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

router.get('/logout', async (req: Request, res: Response) => {
    const {refreshToken} = req.cookies;
    console.log(req.cookies)
    await AddTokenToBlackList(refreshToken);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    delete req.authInfo;
    res.redirect('/login');

});

router.get('/resource', (req: Request, res: Response, next: NextFunction) => {
    if(req.authInfo) return res.json(req.authInfo);
    else {
        res.status(401).json({message:"Unauthorised"});
    }
});

export default router;