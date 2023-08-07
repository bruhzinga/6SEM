import express from 'express';
import bodyParser from "body-parser"
import {Request,Response} from "express";
import { JSONRPCServer } from 'json-rpc-2.0';
import * as fs from "fs";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const server = new JSONRPCServer();


server.addMethod('sum', (params: number[]) => {
    if (params.length === 0) {
        throw new Error('At least one parameter is required for sum');
    }
    return params.reduce((acc, curr) => acc + curr, 0);
});

server.addMethod('mul', (params: number[]) => {
    if (params.length === 0) {
        throw new Error('At least one parameter is required for mul');
    }
    return params.reduce((acc, curr) => acc * curr, 1);
});

server.addMethod('div', (params: { x: number; y: number }) => {
    const { x, y } = params;
   if(( typeof x === 'undefined' || typeof y === 'undefined')){
        throw new Error('Parameters x and y are required for div');
    }
    if (y === 0) {
        throw new Error('Division by zero');
    }

    return x / y;
});

server.addMethod('proc', (params: { x: number; y: number }) => {
    const { x, y } = params;
    if(( typeof x === 'undefined' || typeof y === 'undefined')){
        throw new Error('Parameters x and y are required for div');
    }
    if (y === 0) {
        throw new Error('Division by zero');
    }
    return (x / y) * 100;
});

app.post("/json-rpc", (req, res) => {
    const jsonRPCRequest = req.body;
    server.receive(jsonRPCRequest).then(jsonRPCResponse => {
        if (jsonRPCResponse) {
            res.json(jsonRPCResponse);
        } else {
            res.sendStatus(204);
        }
    });
});



app.use((req:Request, res:Response, next)=>{
    console.log(req.method, decodeURI(req.url));
    next();
})










app.listen(3000,()=>{
    console.log("Server running")
});